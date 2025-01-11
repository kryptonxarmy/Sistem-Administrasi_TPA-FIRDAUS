// /pages/api/admin/child/updateChild.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  const { id, name, studentId, phone, birthDate, gender, address, city, postalCode, country, parentId, classId } = await req.json();

  try {
    const updatedChild = await prisma.child.update({
      where: { id: parseInt(id) },
      data: {
        name,
        studentId,
        phone,
        birthDate: new Date(birthDate),
        gender,
        address,
        city,
        postalCode,
        country,
        parentId,
        classId,
      },
    });
    return NextResponse.json({ success: true, child: updatedChild });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}