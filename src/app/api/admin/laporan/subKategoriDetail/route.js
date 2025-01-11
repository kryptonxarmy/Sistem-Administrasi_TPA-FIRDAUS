// /pages/api/subCategoryDetail/addSubCategoryDetail.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { progressDetailId, subCategory, status } = await req.json();

  try {
    const subCategoryDetail = await prisma.subCategoryDetail.create({
      data: {
        progressDetailId,
        subCategory,
        status,
      },
    });
    return NextResponse.json({ success: true, subCategoryDetail });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    const subCategoryDetails = await prisma.subCategoryDetail.findMany({
      include: {
        progressDetail: true,
      },
    });
    return NextResponse.json({ success: true, subCategoryDetails });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
