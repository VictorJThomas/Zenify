import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";

export const getUserId = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return "No user found";
  }

  const userFound = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });


  if (!userFound) {
    return;
  }

  const id = userFound.id;

  return id;
};
