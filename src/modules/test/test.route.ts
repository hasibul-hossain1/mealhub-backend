import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { Role } from "../../generated/prisma/enums.js";

const router = Router()

router.get("/",authMiddleware(Role.CUSTOMER),(req,res) => {
    console.log('got hit');
    res.json({message:"got hit"})
})

export default router