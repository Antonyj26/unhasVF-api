import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export function verifyUserAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Não tem autorização", 401);
    }

    if (!role.includes(req.user.role)) {
      throw new AppError("Não tem autorização", 401);
    }

    return next();
  };
}
