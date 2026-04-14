import config from "../../config/index.js";
import { prisma } from "../../lib/prisma.js";
import stripe from "../../lib/stripe.js";
import { ApiError } from "../../utils/ApiError.js";

type CreateOrderPayload = {
  userId: string;
  address: string;
  paymentMethod: "STRIPE" | "COD";
  items: {
    mealId: string;
    quantity: number;
  }[];
};

const createOrder = async (payload: CreateOrderPayload) => {
  const { userId, items, address, paymentMethod } = payload;

  if (!items.length) {
    throw new ApiError(400, "Order must contain at least one item");
  }

  return prisma.$transaction(async (tx) => {
    // 🔹 1. Fetch meals
    const mealIds = items.map((item) => item.mealId);

    const meals = await tx.meal.findMany({
      where: {
        id: { in: mealIds },
      },
    });

    if (meals.length !== items.length) {
      throw new ApiError(400, "Invalid order items");
    }

    // 🔹 Optimize lookup
    const mealMap = new Map(meals.map((m) => [m.id, m]));

    // 🔹 2. Calculate total price
    const totalPrice = items.reduce((acc, item) => {
      const meal = mealMap.get(item.mealId);
      if (!meal) throw new ApiError(400, "Invalid Meal");

      return acc + meal.price * item.quantity;
    }, 0);

    // 🔹 3. Create order (PENDING)
    const order = await tx.order.create({
      data: {
        address,
        userId,
        totalPrice,
        paymentMethod,
        orderItems: {
          create: items.map((item) => {
            const meal = mealMap.get(item.mealId);
            if (!meal) throw new ApiError(400, "Invalid Meal");

            return {
              quantity: item.quantity,
              priceAtOrderTime: meal.price,
              meal: {
                connect: { id: meal.id },
              },
            };
          }),
        },
      },
    });

    // 🔹 4. Handle payment method
    if (paymentMethod === "COD") {
      // 💰 Cash on Delivery - Order created successfully
      return {
        orderId: order.id,
        message: "Order created with Cash on Delivery payment method",
      };
    }

    // 🔹 5. Create Stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: items.map((item) => {
        const meal = mealMap.get(item.mealId);
        if (!meal) throw new ApiError(400, "Invalid Meal");

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: meal.foodName,
              images: meal.imageUrl ? [meal.imageUrl] : [],
              ...(meal.description && { description: meal.description }),
            },
            unit_amount: meal.price * 100,
          },
          quantity: item.quantity,
        };
      }),

      success_url: `${config.frontend_url}/success`,
      cancel_url: `${config.frontend_url}/cancel`,

      metadata: {
        orderId: order.id, // ✅ CRITICAL
        userId,
      },
    });

    // 🔹 6. Update order with Stripe session ID
    await tx.order.update({
      where: { id: order.id },
      data: {
        stripeSessionId: stripeSession.id,
        isPaid: true,
        paidAt: new Date(),
        status: "CONFIRMED"
      },
    });

    // 🔹 7. Return checkout URL
    return {
      orderId: order.id,
      checkoutUrl: stripeSession.url,
    };
  });
};

const getMyAllOrders = async (id: string) => {
  const data = await prisma.order.findMany({
    where: {
      userId: id,
    },
    include: {
      orderItems: {
        include: {
          meal: {
            select: {
              foodName: true,
              imageUrl: true,
            },
          },
        },
      },
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
  const data = await prisma.$transaction(async (tx) => {
    await tx.order.findUniqueOrThrow({
      where: {
        id: orderId,
      },
      select: {
        userId: true,
      },
    });
  });
  return data;
};

const orderedByCurrentUser = async ({
  userId,
  mealId,
}: {
  userId: string;
  mealId: string;
}) => {
  const order = await prisma.order.findFirst({
    where: {
      userId,
      orderItems: {
        some: {
          mealId,
        },
      },
    },
  });
  return !!order;
};

export default {
  createOrder,
  getMyAllOrders,
  getOrderById,
  orderedByCurrentUser,
};
