import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../auth/Middleware/middleware';
// GET all attribute values

const prisma = new PrismaClient();

export async function GET() {
  const attributeValues = await prisma.attributeValue.findMany({
    include: { attribute: true }, // Includes the parent attribute information
  });
  return NextResponse.json(attributeValues);
}

// POST a new attribute value
// Corrected POST method for creating a new attribute value
export async function POST(request) {
    const body = await request.json();
  
    // Log to check if attribute_id is present
    console.log("Received body:", body);
  
    if (!body.attribute_id) {
      return NextResponse.json(
        { error: 'attribute_id is required' },
        { status: 400 }
      );
    }
  
    try {
      const attributeValue = await prisma.attributeValue.create({
        data: {
          value: body.value,
          attribute: {
            connect: { id: body.attribute_id },
          },
        },
        include: {
          attribute: true,
        },
      });
      return NextResponse.json(attributeValue);
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  