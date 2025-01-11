// /pages/api/attendance/addAttendance.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { date, type, childId, teacherId, status, arrivalTime, departureTime, remarks } = await req.json();

  try {
    let penjemput = '';
    let pengantar = '';

    if (type === 'child' && childId) {
      const child = await prisma.child.findUnique({
        where: { id: parseInt(childId) }, // Konversi childId menjadi integer
        include: { parent: { include: { user: true } } },
      });
      if (child) {
        penjemput = child.parent.user.name;
        pengantar = child.parent.user.name;
      }
    }

    const attendance = await prisma.attendance.create({
      data: {
        date: new Date(date),
        type,
        childId: childId ? parseInt(childId) : null, // Konversi childId menjadi integer jika ada
        teacherId: teacherId ? parseInt(teacherId) : null, // Konversi teacherId menjadi integer jika ada
        status,
        arrivalTime: arrivalTime ? new Date(`${date}T${arrivalTime}:00`) : null, // Gabungkan tanggal dan waktu
        departureTime: departureTime ? new Date(`${date}T${departureTime}:00`) : null, // Gabungkan tanggal dan waktu
        remarks,
        penjemput,
        pengantar,
      },
    });

    return NextResponse.json({ success: true, attendance });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req) {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        child: {
          select: {
            name: true,
            parent: {
              select: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        teacher: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ success: true, attendance });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}