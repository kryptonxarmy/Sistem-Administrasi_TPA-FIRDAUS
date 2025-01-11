// /pages/api/coreActivity/addCoreActivity.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { week, day, activity, remarks, classId, teacherId, completed } = await req.json();

  try {
    const kegiatanInti = await prisma.coreActivity.create({
      data: {
        week,
        day,
        activity,
        remarks,
        classId,
        teacherId,
        completed,
      },
    });
    return NextResponse.json({ success: true, kegiatanInti });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    const coreActivities = await prisma.coreActivity.findMany({
      include: {
        class: true,
        Teacher: true,
      },
    });
    return NextResponse.json({ success: true, coreActivities });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}