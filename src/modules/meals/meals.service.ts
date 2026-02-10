import { Meal } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

const getAllMeals = async () => {
    const meals = await prisma.meal.findMany();
    return meals
};


const getSingleMealById = async (id:string) => {
    const meal = await prisma.meal.findUniqueOrThrow({
        where:{
            id
        }
    });
    return meal
};



export default {
    getAllMeals,
    getSingleMealById,
}