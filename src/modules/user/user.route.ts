import { Router } from "express";
import userController from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { catchAsync } from "../../utils/catchAsync.js";

const router = Router()

router.get('/',authMiddleware(),catchAsync(userController.aboutMe))

export default router