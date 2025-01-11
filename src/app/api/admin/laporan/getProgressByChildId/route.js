// /pages/api/laporan/getProgressByChildId.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const childId = parseInt(searchParams.get('childId'));

  try {
    // Ambil data Progress berdasarkan childId
    const progress = await prisma.progress.findMany({
      where: { childId },
      include: {
        child: true,
        details: {
          include: {
            subDetails: true,
          },
        },
      },
    });

    // Ambil data ProgressDetail berdasarkan childId
    const progressDetails = await prisma.progressDetail.findMany({
      where: {
        progress: {
          childId,
        },
      },
      include: {
        subDetails: true,
        progress: true,
      },
    });

    // Ambil data SubCategoryDetail berdasarkan childId
    const subCategoryDetails = await prisma.subCategoryDetail.findMany({
      where: {
        progressDetail: {
          progress: {
            childId,
          },
        },
      },
      include: {
        progressDetail: true,
      },
    });

    return NextResponse.json({ success: true, progress, progressDetails, subCategoryDetails });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}