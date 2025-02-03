
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// GET an attribute value by ID
const prisma = new PrismaClient();
export async function GET(request, { params }) {
  const { id } = params;
  const attributeValue = await prisma.attributeValue.findUnique({
    where: { id: parseInt(id) },
    include: { attribute: true },
  });
  return attributeValue
    ? NextResponse.json(attributeValue)
    : NextResponse.json({ error: 'AttributeValue not found' }, { status: 404 });
}

// PUT update an attribute value by ID
export async function PUT(request, { params }) {
  const body = await request.json();
  const id = parseInt(params.id);

  // Log to check if attribute_id is present
  console.log("Received body:", body);

  if (!body.attribute_id) {
    return NextResponse.json(
      { error: 'attribute_id is required' },
      { status: 400 }
    );
  }

  try {
    const UpdateattributeValue = await prisma.attributeValue.update({
      where: { id },
      data: {
        value: body.value,
        slug: body.slug,  // Ensure slug is included here
        attribute: {
          connect: {
            id: body.attribute_id,
          },
        },
      },
      include: {
        attribute: true,
      },
    });
    return NextResponse.json(UpdateattributeValue);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE an attribute value by ID
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.attributeValue.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'AttributeValue deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
