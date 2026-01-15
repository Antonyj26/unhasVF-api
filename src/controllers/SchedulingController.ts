import { request, Request, Response } from "express";
import { SchedulingService } from "../services/SchedulingService";

export class SchedulingController {
  async create(req: Request, res: Response) {
    const { date, status, service, clientId, notes } = req.body;

    const scheduling = await SchedulingService.create({
      date,
      status,
      service,
      clientId,
      notes,
    });

    return res.status(201).json({ scheduling });
  }

  async index(req: Request, res: Response) {
    const schedulings = await SchedulingService.index(req.query);

    return res.status(201).json(schedulings);
  }

  async update(req: Request, res: Response) {
    const { schedulingId } = req.params;
    const { date, status, service, notes } = req.body;

    const scheduling = await SchedulingService.update(
      { schedulingId },
      { date, status, service, notes }
    );

    return res.status(201).json(scheduling);
  }

  async delete(req: Request, res: Response) {
    const { schedulingId } = req.params;

    await SchedulingService.delete({ schedulingId });

    return res
      .status(201)
      .json({ message: "Agendamento excluído com sucesso" });
  }
}
