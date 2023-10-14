import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const diaries = await prisma.diary.findMany()
        return NextResponse.json(diaries, {status: 201});
    } catch (error) {
        if (error instanceof Error){
            return 
        }
        return NextResponse.json(error, {status : 500});
    }
}

export async function POST(request:Request) {
    try {
        const {img, content, user } = await request.json()

        const diary = await prisma.diary.create({
            data: {
                img : img,
                content : content,
                user : user,
            },
            });
            return NextResponse.json(diary, {status: 201}
            )
    } catch (error) {
        return NextResponse.json(error, {status : 500});
    }
}