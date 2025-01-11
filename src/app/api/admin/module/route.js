// /pages/api/learningModule/addLearningModule.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { title, description } = await req.json();

  try {
    const newLearningModule = await prisma.learningModule.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ success: true, learningModule: newLearningModule });
} catch (error) {
      console.log(error)
    return NextResponse.json({ success: false, error: error.message });
  }
}