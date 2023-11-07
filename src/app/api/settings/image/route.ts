import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    try {
      const { image, user }  = await request.json();
  
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          image,
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