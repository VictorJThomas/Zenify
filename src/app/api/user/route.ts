import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  try {
    const { userEmail } = await request.json();
    if (!userEmail) {
      return NextResponse.json(
        {
          message: "User parameter is required.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
        return NextResponse.json(
          {
            message: 'User not found.',
          },
          {
            status: 404,
          }
        );
      }

    const userId = user.id

    return NextResponse.json(userId)
  } catch (e) {}
}
