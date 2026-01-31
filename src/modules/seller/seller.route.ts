import { Router } from "express";
import sellerController from "./seller.controller.js";
import { catchAsync } from "../../utils/catchAsync.js";

const router = Router()



router.post('/create-account',catchAsync(sellerController.signUpAsProvider))


export default router