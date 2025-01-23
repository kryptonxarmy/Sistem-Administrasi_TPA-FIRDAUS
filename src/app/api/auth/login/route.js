// /pages/api/auth/login.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET; // Ganti dengan secret key Anda

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
      return NextResponse.json({ success: true, token });
    } else {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, );
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, );
  }
}
