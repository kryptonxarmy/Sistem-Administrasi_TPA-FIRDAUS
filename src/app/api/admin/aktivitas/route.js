// /pages/api/activity/addActivity.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { week, learningModuleId, allocationId, classId, profilePancasilaDesc, facilityDesc } = await req.json();

  try {
    const activity = await prisma.activity.create({
      data: {
        week,
        learningModuleId,
        allocationId,
        classId,
        profilePancasilaDesc,
        facilityDesc,
      },
    });

    return NextResponse.json({ success: true, activity });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        learningModule: true,
        allocation: true,
        class: true,
      },
    });
    return NextResponse.json({ success: true, activities });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}