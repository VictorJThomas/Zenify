import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// interface Params {
//     params: { id: string};
// }

export async function GET(request:Request) {
    const { id } = await request.json();
    try {
        const diary = await prisma.diary.findUnique({
            where: {
                id: id,
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