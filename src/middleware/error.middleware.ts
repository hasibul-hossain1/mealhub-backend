import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { Prisma } from "../generated/prisma/client.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  let statusCode = err instanceof ApiError ? err.statusCode : 500;
  let message = err instanceof ApiError ? err.message : "Internal Server Error";

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025":
        statusCode = 404;
        message = "Record not found";
        break;

      default:
        break;
    }
  }
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};
