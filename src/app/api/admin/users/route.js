import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { getServerSession } from "next-auth";


export async function GET(request) {
    const adminuser = await prisma.AdminUser.findMany({
  
    })
    return NextResponse.json(adminuser)
  }
  
