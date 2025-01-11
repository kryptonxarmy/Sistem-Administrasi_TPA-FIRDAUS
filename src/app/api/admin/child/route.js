// /pages/api/parent/addChild.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { parentId, name, studentId, phone, birthDate, gender, address, city, postalCode, country, classId } = await req.json();

  try {
    const child = await prisma.child.create({
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
    return NextResponse.json({ success: true, child });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    const children = await prisma.child.findMany({
      include: {
        parent: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        class: true,
      },
    });
    return NextResponse.json({ success: true, children });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
