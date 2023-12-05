import { getUserId } from "@/actions/getUserId";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {  
  try {
    const id = await getUserId()

    const goals = await prisma.focus.findMany({
      where: {
        userId: id
      },
      orderBy:{ 
        createAt: 'desc'
      }
    });
    return NextResponse.json({goals},{ status: 201 });
  } catch (error) {
    console.error('Error fetching goals:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: 'Internal server error.'
        },
        {
          status: 500,
        }
      );
    }
  } finally {
    await prisma.$disconnect()
  }
}