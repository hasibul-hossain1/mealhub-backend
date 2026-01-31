import { RequestHandler } from "express";
import sellerService from "./seller.service.js";
import { ApiError } from "../../utils/ApiError.js";

const signUpAsProvider: RequestHandler = async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
       throw new ApiError(400, "Missing required fields");
    }
    const data = await sellerService.signUpAsProvider({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      success: true,
      data,
      message: "Seller Account created successfully",
    });
};


const getSingleSellerWithMenu: RequestHandler = async (req, res) => {
    const id = req.params.id as string;
    console.log(id);
    const data = await sellerService.getSingleSellerWithMenu(id)
    res.status(200).json({
      success: true,
      data,
      message: "Retrieved single seller with menu successfully",
    });
};

const getAllSellers: RequestHandler = async (req, res) => {
    const data = await sellerService.getAllSellers()
    res.status(200).json({
      success: true,
      data,
      message: "Retrieved All Sellers successfully",
    });
};




export default {
  signUpAsProvider,
  getAllSellers,
  getSingleSellerWithMenu
};
