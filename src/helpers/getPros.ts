import { prisma } from "@/utils/prisma";

export const getPros = async () => {
  const pros = await prisma.user.findMany({
    where: {
      role: "PSYCHOLOGIST",
    },
  });

  return pros;
};