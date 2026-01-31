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

export default {
  signUpAsProvider,
};
