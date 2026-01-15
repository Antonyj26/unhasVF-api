import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";

export class ClientController {
  async create(req: Request, res: Response) {
    const { name, phone } = req.body;

    const client = await ClientService.create({ name, phone });

    return res.status(201).json(client);
  }

  async index(req: Request, res: Response) {
    const clients = await ClientService.index(req.query);

    return res.status(201).json(clients);
  }

  async show(req: Request, res: Response) {
    const { clientId } = req.params;

    const client = await ClientService.show({ clientId });

    return res.status(201).json(client);
  }

  async delete(req: Request, res: Response) {
    const { clientId } = req.params;

    await ClientService.delete({ clientId });

    return res.json({ message: "Cliente excluído com sucesso" });
  }

  async update(req: Request, res: Response) {
    const { clientId } = req.params;
    const { name, phone } = req.body;

    const client = await ClientService.update({ clientId }, { name, phone });

    return res.status(201).json(client);
  }
}
