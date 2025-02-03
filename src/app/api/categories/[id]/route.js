
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// GET all attribute values

const prisma = new PrismaClient();
// GET a category by ID
export async function GET(request, { params }) {
  const { id } = params;
  const category = await prisma.category.findUnique({
    where: { id: parseInt(id) },
    include: { children: true, parent: true },
  });
  return category ? NextResponse.json(category) : NextResponse.json({ error: 'Category not found' }, { status: 404 });
}

// PUT update a category by ID
export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  const updatedCategory = await prisma.category.update({
    where: { id: parseInt(id) },
    data,
  });
  return NextResponse.json(updatedCategory);
}

// DELETE a category by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  await prisma.category.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json({ message: 'Category deleted' });
}
