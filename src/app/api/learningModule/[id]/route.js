// /pages/api/learningModule/[id].js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
    try {
      const formData = await req.formData();
      const conceptMapId = formData.get("conceptMap");
  
      const updateData = {};
  
      if (formData.has("title")) {
        updateData.title = formData.get("title");
      }
      if (formData.has("description")) {
        updateData.description = formData.get("description");
      }
      if (formData.has("durationWeeks")) {
        updateData.durationWeeks = parseInt(formData.get("durationWeeks"), 10);
      }
      if (formData.has("pancasilaDesc")) {
        updateData.pancasilaDesc = formData.get("pancasilaDesc");
      }
      if (formData.has("facilityDesc")) {
        updateData.facilityDesc = formData.get("facilityDesc");
      }
      if (formData.has("semesterId")) {
        updateData.semesterId = parseInt(formData.get("semesterId"), 10);
      }
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

export async function DELETE(req, { params }) {
  const { id } = await req.json();

  try {
    await prisma.learningModule.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}