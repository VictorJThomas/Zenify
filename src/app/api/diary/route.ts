import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const diaries = await prisma.diary.findMany();
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
    const { image, content, email} = await request.json();

    const diary = await prisma.diary.create({
      data: {
        image: image,
        content: content,
        
      }
    })

    console.log(diary);
    const response = {image, content, email}
    return NextResponse.json( response, {status: 201})      
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
