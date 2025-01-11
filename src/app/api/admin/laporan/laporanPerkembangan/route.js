// /pages/api/progress/addProgress.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { date, moralValue, motorGross, motorFine, cognitive, language, social, reflection, comments, childId } = await req.json();

  try {
    // Periksa apakah childId ada di tabel Child
    const childExists = await prisma.child.findUnique({
      where: { id: parseInt(childId) },
    });

    if (!childExists) {
      return NextResponse.json({ success: false, error: 'Child ID does not exist' });
    }

    const progress = await prisma.progress.create({
      data: {
        date: new Date(date),
        moralValue,
        motorGross,
        motorFine,
        cognitive,
        language,
        social,
        reflection,
        comments,
        childId: parseInt(childId),
      },
    });
    return NextResponse.json({ success: true, progress });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    const progress = await prisma.progress.findMany({
      include: {
        child: true,
      },
    });
    return NextResponse.json({ success: true, progress });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}