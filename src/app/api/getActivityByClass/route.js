import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const classId = searchParams.get('classId');

  if (!classId) {
    return NextResponse.json({ success: false, message: "Class ID is required" }, { status: 400 });
  }

  try {
    const activities = await prisma.activity.findMany({
      where: {
        classId: parseInt(classId, 10),
      },
      include: {
        details: true,
        learningModule: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, activities });
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch activities" }, { status: 500 });
  }
}