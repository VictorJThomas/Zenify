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

export async function GETBYID(request:Request, { params }: Params) {
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

export async function POST(request:Request) {
    try {
        const {img, content, user } = await request.json()

        const diary = await prisma.diary.create({
            data: {
                img : img,
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

export async function PUT(request:Request, { params }: Params) {
    try {
        const {img, content } = await request.json();

        const updatedDiary = await prisma.diary.update({
            where: {
                id: String(params.id),
            },
            data: {
                img: img,
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

export async function DELETE(request:Request, { params }: Params) {
    try {
        const deletediary = await prisma.diary.delete({
            where: {
                id : String(params.id),
            },
        });
    
        if (!deletediary) return NextResponse.json({message: "diary not found"}, {status: 404});
        return NextResponse.json
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code = "P2025")
            return NextResponse.json(
                {
                    message: "diary not found",
                },
                {
                    status : 404,
                }
            );
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





