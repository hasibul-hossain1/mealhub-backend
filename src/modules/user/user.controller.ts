import { RequestHandler } from "express"
import userService from "./user.service.js"
import { ApiError } from "../../utils/ApiError.js"

const aboutMe:RequestHandler=async (req,res) => {
        const id = req.user.id
        const user = await userService.aboutMe(id)
        if (!user) {
            throw new ApiError(404,"User not found")
        }
        res.json({
            success:true,
            data:user,
            message:"User retrieved successfully"
        })
   
}

export default {
    aboutMe
}