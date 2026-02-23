import { Request, Response } from "express";
import adminService from "./admin.service";

const createCategory = async (req:Request,res:Response) => {
    const category = await adminService.createCategory(req.body)

    return res.status(201).json({
        success:true,
        data:category,
        message:"Category created successfully"
    })
}


export default {
    createCategory
}