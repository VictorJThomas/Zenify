import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface Params {
    params: { id: string};
}

export async function GET(request:Request, { params }: Params) {
    try {
        const diary = await prisma.diary.findFirst({
            where: {
                id: String(params.id),
            },
        });
        if (!diary) return NextResponse.json({message: "diary not found"}, {status: 404});
        return NextResponse.json(diary, {status: 201});
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

export async function PUT(request:Request, { params }: Params) {
    try {
        const {img, content } = await request.json();

        const updatedDiary = await prisma.diary.update({
            where: {
                id: String(params.id),
            },
            data: {
                image: img,
                content: content,
            }
        });
        if (!updatedDiary) return NextResponse.json({message: "diary not found"}, {status: 404});
        return NextResponse.json(updatedDiary);
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