import { Router } from "express";
import sellerController from "./seller.controller.js";
import { catchAsync } from "../../utils/catchAsync.js";

const router = Router()



router.post('/create-account',catchAsync(sellerController.signUpAsProvider))


router.get('/',catchAsync(sellerController.getAllSellers))


router.get('/:id',catchAsync(sellerController.getSingleSellerWithMenu))


export default router