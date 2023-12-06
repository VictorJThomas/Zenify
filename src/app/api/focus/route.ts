import { getUserId } from "@/actions/getUserId";
import { Prisma, PrismaClient } from "@prisma/client";
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

export async function POST(request: Request) {
  try {
    const { goalTitle, goalDescription, goalTime ,user } = await request.json();

    const userFound = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userFound) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const userId = userFound.id;

    const goal = await prisma.focus.create({
      data: {
        goalTitle: goalTitle,
        goalDescription: goalDescription,
        goalTime: goalTime,
        userId: userId,
      },
    });
    
    prisma.$disconnect
    const response = { goal };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}


export async function PUT(request: Request) {
    const {status, goalid} = await request.json();
    try {

      const updateStatusGoal = await prisma.focus.update({
        where: {
          id: goalid.id,
        },
        data: {
          status,
        },
      });

      return NextResponse.json(updateStatusGoal);
    }
    catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "User not found",
          },
          {
            status: 404,
          }
        );
      }
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  } finally {
    prisma.$disconnect
  }
}


