import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(request) {
    const body = await request.json();
    const variations = Array.isArray(body) ? body : [body];

    try {
        const createdVariations = await Promise.all(
            variations.map(async (variation) => {
                const { productId, attributes } = variation;
console.log(attributes,"attributes")
                return Promise.all(
                    attributes.map(async (attr) => {
                        // Generate a unique slug
                        const generatedSlug = `${attr.name}-${attr.value}`
                            .toLowerCase()
                            .replace(/\s+/g, "-");

                        return prisma.productVariation.create({
                            data: {
                                product: { connect: { id: productId } },
                                slug: generatedSlug,
                                name:attr.name,
                                sku: attr.sku,
                                variation_image:attr.variation_image,
                                price: parseFloat(attr.price),
                                stock: parseInt(attr.stock),
                         
                                // attributes: {
                                //     connect: {
                                //         name: attr.name,
                                //         value: attr.value.toString(),
                                //         slug:attr.name,
                                        
                                //     } 
                                // }
                            },
                            include: {
                                attributes: true
                            }
                        });
                    })
                );
            })
        );

        return NextResponse.json(createdVariations.flat());
    } catch (error) {
        console.error("Failed to create product variations:", error.message || error);
        return NextResponse.json(
            { error: "Failed to create product variations" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
  
  export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
  
    try {
      const variations = await prisma.productVariation.findMany({
        where: productId ? { product_id: parseInt(productId) } : undefined,
        include: {
          attributes: true,
          product: {
            select: {
              name: true
            }
          }
        }
      })
  
      return NextResponse.json(variations)
    } catch (error) {
      console.error("Failed to fetch product variations:", error)
      return NextResponse.json(
        { error: "Failed to fetch product variations" },
        { status: 500 }
      )
    } finally {
      await prisma.$disconnect()
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
      const deleteResult = await prisma.productVariation.deleteMany({
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