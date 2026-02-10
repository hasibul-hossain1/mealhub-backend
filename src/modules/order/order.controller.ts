import { RequestHandler } from "express";
import orderService from "./order.service";

const createOrder: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  const sellerId = req.body.sellerId;
  const items = req.body.items;
  const data = await orderService.createOrder({ items, sellerId, userId });
  res.status(201).json({
    successes: true,
    data,
    message: "Order created successfully",
  });
};

const getMyAllOrders: RequestHandler = async (req, res) => {
  const id = req.user.id;
  const data = await orderService.getMyAllOrders(id);
  res.json({
    success: true,
    data,
    message: "All order retrieved successfully",
  });
};

const getOrderById: RequestHandler = async (req, res) => {
  const orderId = req.params.id as string;
  const userId = req.user.id as string;
  const data = await orderService.getOrderById({orderId,userId})
  res.json({
      success:true,
      data,
      message:"All order retrieved successfully"
  })
};

export default {
  createOrder,
  getMyAllOrders,
  getOrderById,
};
