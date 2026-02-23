import { Router } from "express";
import adminController from "./admin.controller";
import { catchAsync } from "../../utils/catchAsync";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Role } from "../../generated/prisma/enums";

const router =Router()

router.post("/create-category",authMiddleware(Role.ADMIN),catchAsync(adminController.createCategory))


export default router