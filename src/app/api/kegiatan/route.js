import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const kegiatan = await prisma.kegiatan.findMany();
    return NextResponse.json({ success: true, kegiatan });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(req) {
  const { title, image } = await req.json();

  try {
    const newKegiatan = await prisma.kegiatan.create({
      data: {
        title,
        image,
      },
    });
    return NextResponse.json({ success: true, kegiatan: newKegiatan });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req) {
  const { id, title, image } = await req.json();

  try {
    const updatedKegiatan = await prisma.kegiatan.update({
      where: { id: parseInt(id) },
      data: {
        title,
        image,
      },
    });
    return NextResponse.json({ success: true, kegiatan: updatedKegiatan });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.kegiatan.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}