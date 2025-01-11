// /pages/api/notifikasi/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const messages = await prisma.message.findMany({
      include: {
        sender: true,
        receiver: true,
      },
    });
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(req) {
  const { content, senderId, receiverId } = await req.json();

  try {
    const message = await prisma.message.create({
      data: {
        date: new Date(), // Set to current date and time
        content,
        senderId,
        receiverId,
      },
    });
    return NextResponse.json({ success: true, message });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}