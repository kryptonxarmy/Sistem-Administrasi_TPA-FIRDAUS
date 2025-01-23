import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { userId, profilePhoto } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { profilePhoto },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}


export async function PUT(req) {
  const { userId, profilePhoto } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { profilePhoto },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}