
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// GET all attributes
export async function GET(request) {
  const attributes = await prisma.attribute.findMany({
    include: { values: true },
  });
  return NextResponse.json(attributes);
}

// POST a new attribute
export async function POST(request) {
  const data = await request.json();
  const attribute = await prisma.Attribute.create({ data });
  return NextResponse.json(attribute);
}
