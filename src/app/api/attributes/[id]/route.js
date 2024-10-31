
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// GET an attribute by ID
export async function GET(request, { params }) {
  const { id } = params;
  const attribute = await prisma.attribute.findUnique({
    where: { id: parseInt(id) },
    include: { values: true },
  });
  return attribute ? NextResponse.json(attribute) : NextResponse.json({ error: 'Attribute not found' }, { status: 404 });
}

// PUT update an attribute by ID
export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  const updatedAttribute = await prisma.attribute.update({
    where: { id: parseInt(id) },
    data,
  });
  return NextResponse.json(updatedAttribute);
}

// DELETE an attribute by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  await prisma.attribute.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json({ message: 'Attribute deleted' });
}
