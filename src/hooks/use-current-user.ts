import prisma from "@/lib/db";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
export const useCurrentProfile = async () => {
  const session = useSession();

  if (!session.data?.user.id) {
    throw new Error("User is not logged in.");
  }

  const warehouse = await prisma.user.findUnique({
    where: {
      id: session.data.user.id,
    },
    select: {
      warehouseId: true,
      assignedWarehouse: {
        select: {
          id: true,
          location: true,
        },
      },
    },
  });

  return warehouse;
};
