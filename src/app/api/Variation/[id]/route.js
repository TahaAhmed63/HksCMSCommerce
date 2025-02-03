import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
    const { id, slug, sku, price, stock, attributes } = await request.json();
  
    try {
      const updatedVariation = await prisma.productVariation.update({
        where: { id: parseInt(id) },
        data: {
          slug,
          sku,  
          price,
          stock,
          attributes: {
            connect: attributes.map(attr => ({ id: attr.id })),
          },
        },
      });
  
      return NextResponse.json(updatedVariation);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to update product variation' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
  
  export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("product_id");
  
    if (!productId) {
      return NextResponse.json(
        { message: "product_id is required" },
        { status: 400 }
      );
    }
  
    try {
      // Delete all variations associated with the given product_id
      const deleteResult = await prisma.variation.deleteMany({
        where: {
          product_id: parseInt(productId),
        },
      });
  
      return NextResponse.json({
        message: `Deleted ${deleteResult.count} variations associated with product_id ${productId}.`,
      });
    } catch (error) {
      console.error("Error deleting variations:", error);
      return NextResponse.json(
        { message: "Error deleting variations", error: error.message },
        { status: 500 }
      );
    }
  }