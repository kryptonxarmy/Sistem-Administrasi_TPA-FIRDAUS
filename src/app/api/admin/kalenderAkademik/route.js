// /pages/api/academicCalendar/addAcademicCalendar.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { date, activity, description, completed } = await req.json();

  try {
    const academicCalendar = await prisma.academicCalendar.create({
      data: {
        date: new Date(date),
        activity,
        description,
        completed,
      },
    });
    return NextResponse.json({ success: true, academicCalendar });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    const academicCalendar = await prisma.academicCalendar.findMany();
    return NextResponse.json({ success: true, academicCalendar });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
