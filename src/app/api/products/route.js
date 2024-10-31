import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../auth/Middleware/middleware';

const prisma = new PrismaClient();

export async function POST(request) {
  const { decoded, error } = await authMiddleware(request);

  if (error) {
    return NextResponse.json({ message: error }, { status: 401 });
  }

  const body = await request.json();

  try {
    // Check if a product with the same SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: { sku: body.sku },
    });

    if (existingProduct) {
      return NextResponse.json(
        { message: 'A product with this SKU already exists.' },
        { status: 400 }
      );
    }

    // Create the new product if SKU is unique
    const product = await prisma.product.create({
      data: {
        ...body,
        category: body.category_id ? { connect: { id: body.category_id } } : undefined,
        tags: body.tag_ids ? { connect: body.tag_ids.map((id) => ({ id })) } : undefined,
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ message: 'Error creating product', error: err.message }, { status: 500 });
  }
}
