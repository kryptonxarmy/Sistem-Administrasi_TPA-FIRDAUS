import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const childId = searchParams.get("childId");

  if (!childId) {
    return NextResponse.json({ success: false, message: "Child ID is required" }, { status: 400 });
  }

  try {
    const attendance = await prisma.attendance.findMany({
      where: {
        childId: parseInt(childId, 10),
      },
      include: {
        child: {
          select: {
            name: true,
          },
        },
        semester: {
          select: {
            number: true,
          },
        },
        academicYear: {
          select: {
            year: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, attendance });
  } catch (error) {
    console.error("Failed to fetch attendance:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch attendance" });
  }
}
