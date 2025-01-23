import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET /api/academic-calendar
export async function GET() {
  try {
    const activities = await prisma.academicCalendar.findMany();
    return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

// POST /api/academic-calendar
export async function POST(req) {
  const { activityDate, name, description, isCompleted } = await req.json();

  try {
    const newActivity = await prisma.academicCalendar.create({
      data: {
        activityDate: new Date(activityDate),
        name,
        description,
        isCompleted: isCompleted || false,
      },
    });
    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

// PUT /api/academic-calendar/[id]
export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { activityDate, name, description, isCompleted } = await req.json();

  try {
    const updatedActivity = await prisma.academicCalendar.update({
      where: { id: parseInt(id) },
      data: {
        activityDate: new Date(activityDate),
        name,
        description,
        isCompleted,
      },
    });
    return NextResponse.json(updatedActivity, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

// DELETE /api/academic-calendar/:id
export async function DELETE(req) {
  const { id } = req.params;

  try {
    await prisma.academicCalendar.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Activity deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}