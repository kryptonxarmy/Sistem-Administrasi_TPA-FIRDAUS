// /pages/api/teacher/addTeacher.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, email, phone, birthDate, gender, address, city, postalCode, country } = await req.json();

  try {
    const teacher = await prisma.teacher.create({
      data: {
        name,
        email,
        phone,
        birthDate: new Date(birthDate),
        gender,
        address,
        city,
        postalCode,
        country
      },
    });
    return NextResponse.json({ success: true, teacher });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    const teachers = await prisma.teacher.findMany();
    return NextResponse.json({ success: true, teachers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}