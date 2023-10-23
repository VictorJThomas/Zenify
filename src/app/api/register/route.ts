import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import Mailgun from 'mailgun.js'
import formData from 'form-data'
import { randomUUID } from 'crypto'
import { redirect } from "next/navigation";
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { compare } from 'bcrypt'

const prisma = new PrismaClient();

const API_KEY = process.env.MAILGUN_API_KEY || ''
const DOMAIN = process.env.MAILGUN_DOMAIN || ''

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: '' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        if (!user.active) {
          throw new Error('User is not active')
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


export async function POST1(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (password < 6)
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );

    const userFound = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userFound)
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword,
      },
      
    });
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    if (e) {
      console.error(`Something happened: ${e}`);
    }
  }
}
