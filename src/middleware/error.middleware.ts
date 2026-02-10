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
      case "P2002":
        statusCode = 400;
        message= "duplicate value error";
        break;
      case "P2003":
        statusCode = 400;
        message= "foreign key constraint error";
        break;
      case "P2004":
        statusCode = 400;
        message= "A constraint failed";
      default:
        break;
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Prisma validation failed"
  }

  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};
