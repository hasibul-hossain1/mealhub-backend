import { prisma } from "../../lib/prisma.js";

const aboutMe = async (userId:string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: userId
        }
    })
    return user
}

export default {
    aboutMe
}