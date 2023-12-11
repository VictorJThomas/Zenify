import { getUserId } from "@/actions/getUserId";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {  
  try {
    const id = await getUserId()

    const diaries = await prisma.diary.findMany({
      where: {
        userId: id
      },
      orderBy:{ 
        createAt: 'desc'
      }
    });
    return NextResponse.json({diaries},{ status: 201 });
  } catch (error) {
    console.error('Error fetching diaries:', error);
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

    const mood = await prisma.mood.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createAt: 'desc'
      },
      take: 1
    })

    const lastMood = mood[0]?.mood

    const diary = await prisma.diary.create({
      data: {
        image: image,
        content: content,
        userId: userId,
        mood: lastMood
      },
    });
    
    prisma.$disconnect
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
