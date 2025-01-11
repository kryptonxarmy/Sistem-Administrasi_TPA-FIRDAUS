// /pages/api/admin/aktivitas/kegiatanInti/updateKegiatanInti.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  const { id, week, day, activity, remarks, completed } = await req.json();

  try {
    const updatedCoreActivity = await prisma.coreActivity.update({
      where: { id: parseInt(id) },
      data: {
        week,
        day,
        activity,
        remarks,
        completed,
      },
    });
    return NextResponse.json({ success: true, coreActivity: updatedCoreActivity });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
