// /pages/api/admin/laporan/presensi/updatePresensi.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
  const { id, date, type, childId, teacherId, status, arrivalTime, departureTime, remarks } = await req.json();

  if (!id || isNaN(id)) {
    return NextResponse.json({ success: false, error: 'Invalid ID' });
  }

  if (!date || isNaN(new Date(date).getTime())) {
    return NextResponse.json({ success: false, error: 'Invalid Date' });
  }

  const today = new Date();
  const arrivalDateTime = arrivalTime ? new Date(`${today.toISOString().split('T')[0]}T${arrivalTime}`) : null;
  const departureDateTime = departureTime ? new Date(`${today.toISOString().split('T')[0]}T${departureTime}`) : null;

  try {
    const attendance = await prisma.attendance.update({
      where: { id: parseInt(id) },
      data: {
        date: new Date(date),
        type: type || undefined,
        status: status || undefined,
        arrivalTime: arrivalDateTime,
        departureTime: departureDateTime,
        remarks: remarks || undefined,
        child: childId ? { connect: { id: childId } } : undefined,
        teacher: teacherId ? { connect: { id: teacherId } } : undefined,
      },
    });

    return NextResponse.json({ success: true, attendance });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}