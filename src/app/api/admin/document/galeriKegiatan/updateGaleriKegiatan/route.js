// /pages/api/document/updateDocument.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
  const { id, title, link } = await req.json();

  try {
    const document = await prisma.document.update({
      where: { id: parseInt(id) },
      data: {
        title,
        link,
      },
    });
    return NextResponse.json({ success: true, document });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}