import { SessionController } from "../controllers/SessionController";
import { Router } from "express";

const sessionController = new SessionController();
export const sessionRoute = Router();

sessionRoute.post("/", sessionController.create);
