import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface Params {
    params: { id: string};
}

export async function GET() {
    try {
        const diaries = await prisma.diary.findMany()
        return NextResponse.json(diaries, {status: 201});
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

export async function POST(request:Request) {
    try {
        const {img, content, user } = await request.json()

        const diary = await prisma.diary.create({
            data: {
                image : img,
                content : content,
                userId : user,
            },
            });
            return NextResponse.json(diary, {status: 201}
            )
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





