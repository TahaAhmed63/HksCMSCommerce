// app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// import { authMiddleware } from "/auth/Middleware/middleware.js"

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  // const { decoded, error } = await authMiddleware(request);
  // if(error){
  //     return NextResponse.json({ message: error }, { status: 401 });
  // }
  const id = parseInt(params.id);
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      tags: true,
      attributes: true,
      attribute_values: true
    },
  });
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  // const { decoded, error } = await authMiddleware(request);
  // if(error){
  //     return NextResponse.json({ message: error }, { status: 401 });
  // }
  const id = parseInt(params.id);
  const body = await request.json();
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      ...body,
      category: body.category_id
        ? { connect: { id: body.category_id } }
        : undefined,
      tags: body.tag_ids
        ? { connect: body.tag_ids.map(id => ({ id })) }
        : undefined,
        attributes: body.attributes ? body.attributes : undefined,
        attribute_values: body.attribute_values ? body.attribute_values: undefined,
      },
    include: {
      category: true,
      tags: true,
      attributes: true,
      attribute_values: true
    }
  });
  return NextResponse.json(updatedProduct);
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  await prisma.product.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Product deleted' });
}
