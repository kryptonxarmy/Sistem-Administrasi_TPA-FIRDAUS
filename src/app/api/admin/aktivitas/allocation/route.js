// /pages/api/allocation/addAllocation.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { duration } = await req.json();

  try {
    const newAllocation = await prisma.allocation.create({
      data: {
        duration,
      },
    });
    return NextResponse.json({ success: true, allocation: newAllocation });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}