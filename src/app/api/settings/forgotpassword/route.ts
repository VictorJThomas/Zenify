import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend("re_jB8xs4L8_27UJJwb37qe6kZqtLm6hfZr2")

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
      const body: { email: string } = await request.json();
  
      const { email } = body;

        const userFound = await prisma.user.findUnique({
        where: {
            email: email,
        },
        });
  
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
        Id: userFound.id,
      };
  
      const forgetUrl = `http://localhost:3000/change-password?token=${tokenData}`;
  
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
    }
  }