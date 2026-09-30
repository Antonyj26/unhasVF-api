import { SessionController } from "../controllers/SessionController";
import { Router } from "express";
import { rateLimit } from "express-rate-limit";

const sessionController = new SessionController();
export const sessionRoute = Router();

const sessionRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Too many login attempts from this IP, please try again after 15 minutes.",
  },
});

sessionRoute.post("/", sessionRateLimit, sessionController.create);
