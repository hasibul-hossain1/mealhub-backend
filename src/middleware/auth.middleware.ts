import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
import { Role } from "../generated/prisma/enums.js";
import { ApiError } from "../utils/ApiError.js";
export function authMiddleware(...roles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers,
      });
      if (!session) {
        throw new ApiError(401, "Unauthorized");
      }
      if (!session.user.emailVerified) {
        throw new ApiError(
          403,
          "Email not verified, Please verify your email first!",
        );
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role as Role,
        isActive: session.user.isActive as boolean,
        emailVerified: session.user.emailVerified,
      };
      if (roles.length > 0 && !roles?.includes(req.user.role)) {
        throw new ApiError(401, "Unauthorized");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
