import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { currentPassword, confirmPassword, password, user} =
      await request.json();

    if (password.length < 6)
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );

    if (!password || !confirmPassword || !currentPassword) {
      return NextResponse.json({ message: "missing fields" }, { status: 400 });
    }

      const userFound = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!userFound) {
        return NextResponse.json(
          { message: "The user not exist" },
          { status: 400 }
        );
      }

      if (password !== confirmPassword) {
        return NextResponse.json(
          { message: "The passwords not match" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          hashedPassword,
        },
      });

      return NextResponse.json(updatedUser);
  } catch (error) {
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
  }
}
