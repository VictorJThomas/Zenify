import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient();

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: { token: string }
  }
) {
  const { token } = params

  const user = await prisma.user.findFirst({
    where: {
      activateToken: {
        some: {
          AND: [
            {
              activateAt: null,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
  })

  if (!user) {
    throw new Error('Token is invalid or expired')
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
    },
  })

  await prisma.activateToken.update({
    where: {
      token,
    },
    data: {
      activateAt: new Date(),
    },
  })

  redirect('/api/auth/signin')
}