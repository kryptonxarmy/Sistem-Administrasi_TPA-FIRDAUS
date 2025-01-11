// /pages/api/document/addDocument.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { type, day, date, menu } = await req.json();

  try {
    const document = await prisma.document.create({
      data: {
        type : "Menu Makanan",
        day,
        date: new Date(date),
        menu,
      },
    });
    return NextResponse.json({ success: true, document });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    const documents = await prisma.document.findMany({
      where: { type: "Menu Makanan" },
    });
    return NextResponse.json({ success: true, documents });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}