import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path, { resolve } from "path";
import { v2 as cloudinary } from "cloudinary";
import { use } from "react";

cloudinary.config({
  cloud_name: "dxzrvw668",
  api_key: "846899137971279",
  api_secret: "_RPb8aOkSOlB8YFI7QT1cShHxWQ",
});

const prisma = new PrismaClient();

export async function GET() {
  try {
    const diaries = await prisma.diary.findMany();
    return NextResponse.json(diaries, { status: 201 });
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

export async function POST(request: Request) {
  try {
    const { content} = await request.json();
    const data = await request.formData();
    const image = data.get("image");
    const user = "65441989b18dfb381f440cae";
    if (image instanceof Blob) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const response = await new Promise((resolve, reject) => {
        const Repon = cloudinary.uploader
          .upload_stream({}, (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          })
          .end(buffer);
      });
      console.log(response);
      const diary = await prisma.diary.create({
        data: {
          image: response.secure_url,
          content: content,
          userId: user,
        },
      });
      console.log(diary);
      return NextResponse.json(diary, { 
        status: 201,
        url: response.secure_url
      }
      );
    } else {
      // The file is a string.
      const diary = await prisma.diary.create({
        data: {
          content: content,
          userId: user,
        },
      });
      console.log(diary);
      return NextResponse.json(diary, { status: 201 });
    }
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
