import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const {confirmPassword, password, token} =
      await request.json();

    if (password.length < 6)
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );

    if (!password || !confirmPassword) {
      return NextResponse.json({ message: "missing fields" }, { status: 400 });
    }

    console.log(token)
    if (!token) {
      return NextResponse.json(
        {
          message: "The token not exist",
        },
        {
          status: 400,
        }
      );
    }
    try {
      const isTokenValid = jwt.verify(token, "secreto");

      // @ts-ignore
      const { data } = isTokenValid;

      console.log(data);
      const userFound = await prisma.user.findUnique({
        where: {
          id: data.id,
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
          id: data.id,
        },
        data: {
          hashedPassword,
        },
      });

      return NextResponse.json(updatedUser);
    } catch (error) {
      return NextResponse.json(
        { message: "Token not valid", error },
        { status: 400 }
      );
    }
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
