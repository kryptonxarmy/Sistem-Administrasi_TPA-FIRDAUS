// /pages/api/progressDetail/addProgressDetail.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { category, progressId, subDetails } = await req.json();

  try {
    const progressDetail = await prisma.progressDetail.create({
      data: {
        category,
        progressId,
        subDetails: {
          create: subDetails.map(detail => ({
            subCategory: detail.subCategory,
            status: detail.status,
          })),
        },
      },
    });
    return NextResponse.json({ success: true, progressDetail });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    const progressDetails = await prisma.progressDetail.findMany({
      include: {
        subDetails: true,
        progress: true,
      },
    });
    return NextResponse.json({ success: true, progressDetails });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}