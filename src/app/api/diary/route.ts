import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const diaries = await prisma.diary.findMany({
      orderBy:{ 
        createAt: 'desc'
      }
    });
    return NextResponse.json(diaries, { status: 201 });
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

export async function POST(request: Request) {
  try {
    const { image, content, user } = await request.json();

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

    const diary = await prisma.diary.create({
      data: {
        image: image,
        content: content,
        userId: userId,
      },
    });

    const response = { diary };
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
