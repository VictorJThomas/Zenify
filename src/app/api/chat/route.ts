import { analyze } from "@/utils/ai";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const userMessage: string = body.userMessage;
  const { user } = body;

  const botResponse = await analyze(userMessage);

  try {
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

    const wordParser = (word: string) => {
      return word.charAt(0).toLowerCase() + word.slice(1);
    }

    const moodParsed = wordParser(botResponse.mood)

    const mood = await prisma.mood.create({
      data: {
        mood: moodParsed,
        userId: userId,
      },
    });
    prisma.$disconnect;
  } catch (e) {
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
