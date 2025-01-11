// /pages/api/tujuanKegiatan/addTujuanKegiatan.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, description, activityId } = await req.json();

  try {
    const tujuanKegiatan = await prisma.learningGoal.create({
      data: {
        name,
        description,
        activityId,
      },
    });
    return NextResponse.json({ success: true, tujuanKegiatan });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const activityId = searchParams.get('activityId');

  try {
    const tujuanKegiatan = await prisma.learningGoal.findMany({
      where: { activityId: parseInt(activityId) },
    });
    return NextResponse.json({ success: true, tujuanKegiatan });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}