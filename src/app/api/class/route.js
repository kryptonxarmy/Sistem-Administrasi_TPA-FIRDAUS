// /pages/api/class/addClass.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, ageGroup, semesterId } = await req.json();

  try {
    const newClass = await prisma.class.create({
      data: {
        name,
        ageGroup,
        semesterId
      },
    });
    return NextResponse.json({ success: true, class: newClass });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const classes = await prisma.class.findMany();
    return NextResponse.json({ success: true, classes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}