// lib/auth.js
import prisma from './prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (email, password, role, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  let user;
  if (role === 'GURU') {
    const teacher = await prisma.teacher.create({
      data: { user: { create: { email, password: hashedPassword, role, name } } },
    });
    user = teacher.user;
  } else if (role === 'ORANG_TUA') {
    const parent = await prisma.parent.create({
      data: { user: { create: { email, password: hashedPassword, role, name } } },
    });
    user = parent.user;
  }

  return user;
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, user };
};

export const authMiddleware = (handler) => async (req) => {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return handler(req);
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
};