import { analyze } from "@/utils/ai";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient() 

export async function POST(req: Request) {
  const body = await req.json();
  const userMessage: string = body.userMessage;
  const {user} = body

  const botResponse = await analyze(userMessage);

  try {
    const userFound = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

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

    const userId = userFound.id

    const mood = await prisma.mood.create({
        data: {
            mood: botResponse.mood,
            userId: userId
        }
    })
    return NextResponse.json(botResponse, {status: 201})
  }catch (e){
    if (e instanceof Error) {
        return NextResponse.json(
          {
            message: e.message,
          },
          {
            status: 500,
          }
        );
      }
  }

  return NextResponse.json({ role: "assistant", content: botResponse });
}
