import { User } from "@prisma/client";

export const getUserId = (user: User | { id: string }): string => {
  if ("id" in user) {
    // If user object is provided, use its ID
    return user.id;
  } else {
    // If only the ID is provided, use it directly
    return user.id;
  }
};
