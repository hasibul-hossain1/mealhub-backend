import { Router } from "express";
import sellerController from "./seller.controller";

const router = Router()



router.post('/create-account',sellerController.signUpAsProvider)


export default router