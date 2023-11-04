import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getUserId = async (user: any) => {
  const userFound = await prisma.user.findUnique({
    where: {
      email: user,
    },
  });

  const userId = userFound.id

  return userId
};
