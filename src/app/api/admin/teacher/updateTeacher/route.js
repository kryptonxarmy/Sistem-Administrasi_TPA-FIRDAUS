// /pages/api/admin/teacher/updateTeacher.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  const { id, name, email, phone, birthDate, gender, address, city, postalCode, country } = await req.json();

  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phone,
        birthDate: new Date(birthDate),
        gender,
        address,
        city,
        postalCode,
        country,
      },
    });
    return NextResponse.json({ success: true, teacher: updatedTeacher });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
