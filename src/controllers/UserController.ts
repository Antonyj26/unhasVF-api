import { Response, Request } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      const user = await UserService.create({ name, email, password, role });

      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
    }
  }
}
