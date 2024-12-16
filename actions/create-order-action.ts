"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";

export const createOrder = async (data: unknown) => {
  const result = OrderSchema.safeParse(data);

  console.log({ result });
  console.log(result.data?.order);
  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  try {
    console.log("##########", result.data);
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
