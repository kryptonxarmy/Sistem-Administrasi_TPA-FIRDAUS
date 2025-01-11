// /pages/api/document/updateMenu.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
  const { id, day, date, menu } = await req.json();

  try {
    const document = await prisma.document.update({
      where: { id: parseInt(id) },
      data: {
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