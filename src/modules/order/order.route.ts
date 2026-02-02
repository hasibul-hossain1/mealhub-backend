import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync";
import orderController from "./order.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Role } from "../../generated/prisma/enums";

const router = Router()

router.post('/',authMiddleware(Role.CUSTOMER),catchAsync(orderController.createOrder))

router.get('/',authMiddleware(Role.CUSTOMER),catchAsync(orderController.getMyAllOrders))

router.get('/',authMiddleware(Role.CUSTOMER),catchAsync(orderController.getMyAllOrders))

export default router