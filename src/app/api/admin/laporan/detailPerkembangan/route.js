// /pages/api/progressDetail/index.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export async function POST(req) {
  const { category, progressId, subDetails } = await req.json();

  try {
    const progressDetail = await prisma.progressDetail.create({
      data: {
        category,
        progressId: parseInt(progressId),
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

export async function PUT(req) {
  const { id, category, subDetails } = await req.json();

  try {
    // Update ProgressDetail
    const progressDetail = await prisma.progressDetail.update({
      where: { id: parseInt(id) },
      data: {
        category,
      },
    });

    // Delete existing subDetails
    await prisma.subCategoryDetail.deleteMany({
      where: { progressDetailId: parseInt(id) },
    });

    // Create new subDetails
    await prisma.subCategoryDetail.createMany({
      data: subDetails.map(detail => ({
        progressDetailId: parseInt(id),
        subCategory: detail.subCategory,
        status: detail.status,
      })),
    });

    return NextResponse.json({ success: true, progressDetail });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    // Delete subDetails first
    await prisma.subCategoryDetail.deleteMany({
      where: { progressDetailId: parseInt(id) },
    });

    // Delete progressDetail
    await prisma.progressDetail.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}