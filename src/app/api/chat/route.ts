import { analyze } from "@/utils/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
   const userMessage: string = body.userMessage

    const botResponse = await analyze(userMessage)


    return NextResponse.json({role: "assistant", content: botResponse})
}