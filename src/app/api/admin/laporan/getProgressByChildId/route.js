// /pages/api/admin/laporan/getProgressDetailByChildId.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const childId = parseInt(searchParams.get('childId'));

  if (!childId) {
    return new Response(JSON.stringify({ success: false, message: 'childId is required' }), { status: 400 });
  }

  try {
    // Ambil data Progress berdasarkan childId
    const progress = await prisma.progress.findMany({
      where: { childId },
      include: {
        child: true,
        semester: true,
        academicYear: true,
        details: {
          include: {
            subDetails: true,
          },
        },
      },
    });

    return new Response(JSON.stringify({ success: true, progress }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}