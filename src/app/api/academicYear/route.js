// /pages/api/academicYear/index.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const academicYears = await prisma.academicYear.findMany({
      // include: {
      //   semesters: true,
      // },
    });
    return NextResponse.json({ success: true, academicYears });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(req) {
  const { year } = await req.json();

  try {
    const academicYear = await prisma.academicYear.create({
      data: {
        year,
      },
    });
    return NextResponse.json({ success: true, academicYear });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req) {
    const { id, year } = await req.json();
  
    try {
      const updatedAcademicYear = await prisma.academicYear.update({
        where: { id: parseInt(id) },
        data: { year },
      });
      return NextResponse.json({ success: true, academicYear: updatedAcademicYear });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }