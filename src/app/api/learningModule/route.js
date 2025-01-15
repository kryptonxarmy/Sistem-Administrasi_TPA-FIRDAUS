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
  const { title, description, durationWeeks, pancasilaDesc, facilityDesc, conceptMap, semesterId } = await req.json();

  try {
    const learningModule = await prisma.learningModule.create({
      data: {
        title,
        description,
        durationWeeks,
        pancasilaDesc,
        facilityDesc,
        conceptMap,
        semesterId,
      },
    });
    return NextResponse.json({ success: true, learningModule });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
