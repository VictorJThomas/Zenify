import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request:Request) {
    const { user } = await request.json();
    try {
        const getUser = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });
        if (!getUser) return NextResponse.json({message: "user not found"}, {status: 404});
        return NextResponse.json(getUser, {status: 201});
    } catch (error) {
        if (error instanceof Error){
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status : 500
                }
            )
        }
    }
}