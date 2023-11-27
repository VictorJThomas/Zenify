import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const useDiaries = async (user: any) => {
  const userId = await prisma.user.findUnique({
    where: {
      email: user,
    },
  });

    console.log(userId)

  return userId
  //   const [diaries, setDiaries] = useState<any[]>([]);

  //   const getDiaries = async () => {
  //     try {


  //       if (userId) {
  //         const diariesData = await prisma.diary.findMany({
  //           where: {
  //             userId: userId.id,
  //           },
  //         });
  //         setDiaries(diariesData);
  //       } else {
  //         console.error("User not found with email:", user);
  //         setDiaries([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching diaries:", error);
  //       setDiaries([]);
  //     }
  //   };

  //   useEffect(() => {
  //     if (user) {
  //       getDiaries();
  //     }
  //   }, [user]);

  //   return diaries;
};
