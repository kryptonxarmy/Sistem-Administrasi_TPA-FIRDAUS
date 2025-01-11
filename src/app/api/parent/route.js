// /pages/api/admin/parents/getParents.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const parents = await prisma.parent.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ success: true, parents });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}