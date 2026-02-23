import { Category } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createCategory = async (data: Partial<Category>) => {
    const category = await prisma.category.create({
        data:{
            name: data.name!,
            imageUrl:data.imageUrl!,
        }
    })

    return category;
}

export default {
    createCategory
}