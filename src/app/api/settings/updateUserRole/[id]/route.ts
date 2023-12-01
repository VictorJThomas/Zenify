import { getUserId } from "@/actions/getUserId";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { newRole } = await request.json();
    const id = await getUserId();

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role: newRole,
      },
    });
    const response = {
        updatedUser: {
            ...updatedUser,
            data: undefined
        }
    }
    return NextResponse.json( response , { status: 200 });
  } catch (error) {
    console.error("Error updating role:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Internal server error.",
        },
        {
          status: 500,
        }
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}
