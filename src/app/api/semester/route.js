// /pages/api/semester/index.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const semesters = await prisma.semester.findMany({
      // include: {
      //   academicYear: true,
      //   learningModules: true,
      //   classes: true,
      // },
    });
    return NextResponse.json({ success: true, semesters });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(req) {
  const { number, academicYearId, weeks } = await req.json();

  try {
    const semester = await prisma.semester.create({
      data: {
        number,
        academicYearId,
        weeks,
      },
    });
    return NextResponse.json({ success: true, semester });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}