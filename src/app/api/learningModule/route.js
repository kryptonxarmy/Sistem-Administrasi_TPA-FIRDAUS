// /pages/api/learningModule/index.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const learningModules = await prisma.learningModule.findMany({
      include: {
        semester: true,
        learningGoals: true,
        activities: true,
        classes: true,
      },
    });
    return NextResponse.json({ success: true, learningModules });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const conceptMapId = formData.get("conceptMap");

    // Create learning module
    const learningModule = await prisma.learningModule.create({
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
        durationWeeks: parseInt(formData.get("durationWeeks"), 10),
        pancasilaDesc: formData.get("pancasilaDesc"),
        facilityDesc: formData.get("facilityDesc"),
        conceptMap: conceptMapId || "",
        semesterId: parseInt(formData.get("semesterId"), 10),
      },
    });

    return NextResponse.json({
      success: true,
      learningModule,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const formData = await req.formData();
    const conceptMapId = formData.get("conceptMap");

    const updateData = {
      title: formData.get("title"),
      description: formData.get("description"),
      durationWeeks: parseInt(formData.get("durationWeeks"), 10),
      pancasilaDesc: formData.get("pancasilaDesc"),
      facilityDesc: formData.get("facilityDesc"),
      semesterId: parseInt(formData.get("semesterId"), 10),
    };

    // Only update conceptMap if new file was uploaded
    if (conceptMapId) {
      updateData.conceptMap = conceptMapId;
    }

    const learningModule = await prisma.learningModule.update({
      where: { id: parseInt(params.id) },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      learningModule,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.learningModule.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}