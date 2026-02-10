import { prisma } from "../../lib/prisma.js";

const aboutMe = async (userId:string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: userId
        }
    })
    return user
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

const updateUserStatus = async (userId:string,status:boolean) => {
    const updated = await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            isActive:status
        }
    })
    return updated
}

export default {
    aboutMe,
    getAllUsers,
    updateUserStatus
}