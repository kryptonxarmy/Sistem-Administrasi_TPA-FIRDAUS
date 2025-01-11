// /pages/api/capaianPembelajaran/addCapaianPembelajaran.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, description, activityId } = await req.json();

  try {
    const capaianPembelajaran = await prisma.learningGoal.create({
      data: {
        name,
        description,
        activityId,
      },
    });
    return NextResponse.json({ success: true, capaianPembelajaran });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const activityId = searchParams.get('activityId');

  try {
    const capaianPembelajaran = await prisma.learningGoal.findMany({
      where: { activityId: parseInt(activityId) },
    });
    return NextResponse.json({ success: true, capaianPembelajaran });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}