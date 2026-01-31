import { RequestHandler } from "express";
import sellerService from "./seller.service";

const signUpAsProvider: RequestHandler = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Missing required fields",
      });
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
  } catch (error: any) {
    res.status(400).json({
      success: false,
      data: null,
      message: error.message || "Unable to create seller account",
    });
  }
};

export default {
  signUpAsProvider,
};
