// /pages/api/admin/kalenderAkademik/updateAcademicCalendar.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
  const { id, completed } = await req.json();

  try {
    const updatedActivity = await prisma.academicCalendar.update({
      where: { id: parseInt(id) },
      data: { completed },
    });
    return NextResponse.json({ success: true, academicCalendar: updatedActivity });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}