import { RequestHandler } from "express";
import mealsService from "./meals.service.js";

const getAllMeals: RequestHandler = async (req, res) => {
  const allMeals = await mealsService.getAllMeals();
  res.json({
    success: true,
    data: allMeals,
    message: "Meals retrieved successfully",
  });
};

const getSingleMealById: RequestHandler = async (req, res) => {
  const id = req.params.id as string;
  const meal = await mealsService.getSingleMealById(id);
  res.json({
    success: true,
    data: meal,
    message: "Meals retrieved successfully",
  });
};


export default {
  getAllMeals,
  getSingleMealById,
};
