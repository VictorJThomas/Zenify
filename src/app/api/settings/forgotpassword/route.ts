import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";
import jwt from "jsonwebtoken";

const resend = new Resend("re_jB8xs4L8_27UJJwb37qe6kZqtLm6hfZr2");

export async function POST(request: NextRequest) {
  try {
    const body: { email: string } = await request.json();

    const { email } = body;

    const userFound = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log(userFound);
    if (!userFound)
      return NextResponse.json(
        {
          message: "The email not exists",
        },
        {
          status: 400,
        }
      );

    const tokenData = {
      email: userFound.email,
      id: userFound.id,
    };
    console.log(tokenData);

    const token = jwt.sign({ data: tokenData }, "secreto", {
      expiresIn: 86400,
    });

    const forgetUrl = `http://localhost:3000/change-password?token=${token}`;

    // @ts-ignore
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Change",
      react: EmailTemplate({ buttonUrl: forgetUrl }),
    });

    return NextResponse.json(
      { message: "Email send successfully" },
      { status: 200 }
    );
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
  } finally {
    prisma.$disconnect;
  }
}
