import { Request, Response, NextFunction } from "express";
import { authConfig } from "../configs/auth";
import { verify } from "jsonwebtoken";
import { AppError } from "../utils/AppError";

interface tokenPayload {
  sub: string;
  role: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token não encontrado", 401);
    }

    const [, token] = authHeader.split(" ");

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as tokenPayload;

    req.user = {
      id: user_id,
      role: role as "ADMIN" | "CLIENT",
    };

    return next();
  } catch (error) {
    console.log(error);
    throw new AppError("JWT token inválido", 401);
  }
}
