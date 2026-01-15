import { Request, Response } from "express";
import { SessionService } from "../services/SessionService";

export class SessionController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const session = await SessionService.create({ email, password });

    return res.status(201).json(session);
  }
}
