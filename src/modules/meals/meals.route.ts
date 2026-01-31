import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync";
import mealsController from "./meals.controller";

const router = Router()

router.get("/",catchAsync(mealsController.getAllMeals))

router.get("/:id",catchAsync(mealsController.getSingleMealById))

export default router