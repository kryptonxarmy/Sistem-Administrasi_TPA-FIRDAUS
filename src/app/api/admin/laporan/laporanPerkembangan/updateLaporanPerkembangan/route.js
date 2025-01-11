// /pages/api/progress/updateProgress.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
  const { id, date, moralValue, motorGross, motorFine, cognitive, language, social, reflection, comments, childId } = await req.json();

  try {
    const updatedProgress = await prisma.progress.update({
      where: { id: parseInt(id) },
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
        childId,
      },
    });
    return NextResponse.json({ success: true, progress: updatedProgress });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}