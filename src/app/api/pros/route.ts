import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {  
  try {
    const professionals = await prisma.user.findMany({
      where: {
        role: "PSYCHOLOGIST",
      },
    });
    prisma.$disconnect
    return NextResponse.json({professionals},{ status: 201 });
  } catch (error) {
    console.error('Error fetching professionals:', error);
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
