import { prisma } from "../../lib/prisma.js";
import { ApiError } from "../../utils/ApiError";

type CreateOrderPayload = {
  userId: string;
  sellerId: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
};

const createOrder = async (payload: CreateOrderPayload) => {
  const { userId, sellerId, items } = payload;
  if (!items.length) {
    throw new ApiError(400, "Order must be contain at least one item");
  }

  return prisma.$transaction(async (tx) => {
    const seller = await tx.seller.findUniqueOrThrow({
      where: {
        id: sellerId,
      },
    });
    if (!seller) throw new ApiError(404, "Seller not found");

    const mealIds = items.map((item) => item.mealId);
    const meals = await tx.meal.findMany({
      where: {
        id: {
          in: mealIds,
        },
        sellerId,
      },
    });

    if (mealIds.length !== items.length) {
      throw new ApiError(400, "Invalid order items");
    }

    const totalPrice = items.reduce((acc, curr) => {
      const meal = meals.find((m) => m.id === curr.mealId);
      return acc + (meal?.price || 0) * curr.quantity;
    }, 0);

    return tx.order.create({
      data: {
        userId,
        sellerId,
        totalPrice,
        orderItems: {
          create: items.map((item) => {
            const meal = meals.find((m) => m.id === item.mealId);
            if (!meal) {
              throw new ApiError(400, "Invalid Meal");
            }
            return {
              quantity: item.quantity,
              priceAtOrderTime: meal?.price as number,
              meal: {
                connect: { id: meal.id },
              },
            };
          }),
        },
      },
    });
  });
};

const getMyAllOrders = async (id: string) => {
  const data = await prisma.order.findMany({
    where: {
      userId: id,
    },
  });
  return data;
};

const getOrderById = async ({
  orderId,
  userId,
}: {
  orderId: string;
  userId: string;
}) => {
  const data = await prisma.$transaction(async(tx)=>{
    const usersOrder = await tx.order.findUniqueOrThrow({
      where:{
        id:orderId
      },
      select:{
        userId:true
      }
    })
  })
  console.log(data);
  return data;
};

export default {
  createOrder,
  getMyAllOrders,
  getOrderById,
};
