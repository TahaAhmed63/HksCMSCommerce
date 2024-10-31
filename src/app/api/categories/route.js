
import { NextResponse } from 'next/server';

// GET all categories
export async function GET() {
  const categories = await prisma.category.findMany({
    include: { children: true, parent: true },
  });
  return NextResponse.json(categories);
}

// POST a new category
export async function POST(request) {
  const data = await request.json();
  const category = await prisma.category.create({ data });
  return NextResponse.json(category);
}
