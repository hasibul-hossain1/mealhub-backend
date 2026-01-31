import { Role } from "../../generated/prisma/enums.js";
import { auth } from "../../lib/auth.js";
import { prisma } from "../../lib/prisma.js";

const signUpAsProvider = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const data = await auth.api.signUpEmail({
    body: {
      email: email,
      password: password,
      name: name,
    },
  });
  if (!data.user.id) {
    throw new Error("Unable to create seller account");
  }

  await prisma.$transaction(async (tx) => {
    const exists = await tx.seller.findUnique({
      where: { userId: data.user.id },
    });

    if (exists) {
      throw new Error("Seller profile already exists");
    }

    await tx.user.update({
      where: {
        id: data.user.id,
      },
      data: {
        role: Role.SELLER,
      },
    });

    await tx.seller.create({
      data: {
        userId: data.user.id,
      },
    });
  });
  const updatedUser = await prisma.user.findUnique({
    where: { id: data.user.id },
    include: { sellers: true },
  });
  return updatedUser;
};

const getAllSellers = async () => {
  const data = await prisma.seller.findMany();
  return data;
};

const getSingleSellerWithMenu = async (id: string) => {
  const data = await prisma.seller.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      meals: true,
    },
  });
  return data;
};

export default {
  signUpAsProvider,
  getAllSellers,
  getSingleSellerWithMenu
};
