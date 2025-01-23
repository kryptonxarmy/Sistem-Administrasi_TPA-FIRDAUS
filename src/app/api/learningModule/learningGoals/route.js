import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const moduleId = searchParams.get('moduleId');

  try {
    const learningGoals = await prisma.learningGoal.findMany({
      where: moduleId ? { moduleId: parseInt(moduleId) } : {},
      include: {
        module: true,
      },
    });
    return NextResponse.json({ success: true, learningGoals });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(req) {
  const { name, description, moduleId } = await req.json();

  try {
    const learningGoal = await prisma.learningGoal.create({
      data: {
        name,
        description,
        moduleId,
      },
    });
    return NextResponse.json({ success: true, learningGoal });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req) {
  const { id, name, description, moduleId } = await req.json();

  try {
    const updatedLearningGoal = await prisma.learningGoal.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        moduleId,
      },
    });
    return NextResponse.json({ success: true, learningGoal: updatedLearningGoal });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}