// /pages/api/document/index.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const semesterId = searchParams.get("semesterId");
  const academicYearId = searchParams.get("academicYearId");

  const whereClause = {
    type: "Galeri Kegiatan",
    ...(semesterId && { semesterId: parseInt(semesterId) }),
    ...(academicYearId && { academicYearId: parseInt(academicYearId) }),
  };

  try {
    const documents = await prisma.document.findMany({
      where: whereClause,
      include: {
        semester: true,
        academicYear: true,
      },
    });
    return NextResponse.json({ success: true, documents });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(req) {
  const { title, link, date, semesterId, academicYearId } = await req.json();

  try {
    const document = await prisma.document.create({
      data: {
        type: "Galeri Kegiatan",
        title,
        link,
        date: date ? new Date(date) : null,
        semester: {
          connect: { id: parseInt(semesterId) },
        },
        academicYear: {
          connect: { id: parseInt(academicYearId) },
        },
      },
    });
    return NextResponse.json({ success: true, document });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req) {
  const { id, title, link, date, semesterId, academicYearId } = await req.json();

  try {
    const updatedDocument = await prisma.document.update({
      where: { id: parseInt(id) },
      data: {
        type: "Galeri Kegiatan",
        title,
        link,
        date: date ? new Date(date) : null,
        semester: {
          connect: { id: parseInt(semesterId) },
        },
        academicYear: {
          connect: { id: parseInt(academicYearId) },
        },
      },
    });
    return NextResponse.json({ success: true, document: updatedDocument });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
