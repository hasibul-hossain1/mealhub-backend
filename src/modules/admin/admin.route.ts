import { Router } from "express";
import adminController from "./admin.controller.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { Role } from "../../generated/prisma/enums.js";

const router =Router()

router.post("/create-category",authMiddleware(Role.ADMIN),catchAsync(adminController.createCategory))

router.delete("/delete-category/:id",authMiddleware(Role.ADMIN),catchAsync(adminController.deleteCategory))

router.get("/all-meal",authMiddleware(Role.ADMIN),catchAsync(adminController.getAllOrder))


export default router