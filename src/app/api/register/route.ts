import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { isValidEmail } from "@/utils/isValidEMail";
import { prisma } from "@/utils/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    if (password.length < 6)
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ message: "missing fields" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          message: "Email not valided",
        },
        {
          status: 400,
        }
      );
    }

    /*if (password !== confirmPassWord){
      return NextResponse.json(
        {
          message: "The passwords not match",
        },
        {
          status: 400,
        }
      );
    }*/

    const userFound = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userFound)
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword,
      },
    });
    prisma.$disconnect
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    if (e) {
      throw new Error("Something wrong happened");
    }
  }
}
