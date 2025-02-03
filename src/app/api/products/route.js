import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { authMiddleware } from "../auth/Middleware/middleware"

const prisma = new PrismaClient()

export async function POST(request) { 
  const { decoded, error } = await authMiddleware(request)

  if (error) {
    return NextResponse.json({ message: error }, { status: 401 })
  }

  const body = await request.json()

  try {
    // Check if a product with the same SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: { sku: body.sku }
    })

    if (existingProduct) {
      return NextResponse.json(
        { message: "A product with this SKU already exists." },
        { status: 400 }
      )
    }
    console.log(body,"body")
    // Create the new product if SKU is unique
    const product = await prisma.product.create({
  
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
    })
console.log(product,"product")
    return NextResponse.json(product)
  } catch (err) {
    console.error("Error creating product:", err)
    return NextResponse.json(
      { message: "Error creating product", error: err.message },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  const { decoded, error } = await authMiddleware(request)

  if (error) {
    return NextResponse.json({ message: error }, { status: 401 })
  }

  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get("page") || "1", 10)
  const limit = parseInt(url.searchParams.get("limit") || "10", 10)
  const search = url.searchParams.get("search") || ""

  try {
    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
            { sku: { contains: search } }
          ]
        }
      : {}

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          tags: true,
          attributes: true,
          attribute_values: true,
          product_variations: true,
        },
        orderBy: { created_at: "desc" }
      }),
      prisma.product.count({ where })
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (err) {
    console.error("Error fetching products:", err)
    return NextResponse.json(
      { message: "Error fetching products", error: err.message },
      { status: 500 }
    )
  }
}
