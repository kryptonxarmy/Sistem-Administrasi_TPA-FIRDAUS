// pages/api/feedback/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { content, parentId } = await req.json();

  try {
    const feedback = await prisma.feedback.create({
      data: {
        content,
        parentId,
      },
    });
    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const feedbacks = await prisma.feedback.findMany({
      include: {
        parent: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
            child: {
              select: {
                name: true,
                class: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return NextResponse.json({ success: true, feedbacks });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get('id');
  
    try {
      await prisma.feedback.delete({
        where: { id: parseInt(id, 10) },
      });
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
