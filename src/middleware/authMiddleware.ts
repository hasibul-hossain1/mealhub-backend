import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { Role } from "../generated/prisma/enums";
export function authMiddleware(...roles:Role[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!session.user.emailVerified) {
      return res.status(403).json({ message: "Email not verified, Please verify your email first!" });
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
      return res.status(403).json({message:"Unauthorized"})
    }
    next();
  };
}
