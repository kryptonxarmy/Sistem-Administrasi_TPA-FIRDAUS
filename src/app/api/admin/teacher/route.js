// /pages/api/teacher/addTeacher.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, email, phone, nip, birthDate, gender, address, city, postalCode, country, profilePhoto } = await req.json();

  try {
    const teacher = await prisma.teacher.create({
      data: {
        name,
        email,
        phone,
        nip,
        birthDate: new Date(birthDate),
        gender,
        address,
        city,
        postalCode,
        country,
        profilePhoto, // Add this line
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

export async function PUT(req) {
  const { id, name, email, phone, nip, birthDate, gender, address, city, postalCode, country, profilePhoto } = await req.json();

  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phone,
        nip,
        birthDate: new Date(birthDate),
        gender,
        address,
        city,
        postalCode,
        country,
        profilePhoto, // Add this line
      },
    });
    return NextResponse.json({ success: true, teacher: updatedTeacher });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, 500);
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.teacher.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, 500);
  }
}