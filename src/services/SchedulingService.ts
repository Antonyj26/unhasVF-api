import { z } from "zod";
import { ServiceStatus, ServiceType } from "@prisma/client";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
const createSchema = z.object({
  date: z.coerce.date(),
  status: z.nativeEnum(ServiceStatus).optional().default("PENDENTE"),
  service: z.nativeEnum(ServiceType),
  clientId: z.string().uuid(),
  notes: z.string().nullable().optional(),
});

const updateSchema = z.object({
  date: z.coerce.date().optional(),
  status: z.nativeEnum(ServiceStatus).optional().default("PENDENTE"),
  service: z.nativeEnum(ServiceType).optional(),
  notes: z.string().nullable().optional(),
});

const paramsSchema = z.object({
  schedulingId: z.string().uuid(),
});

const queryParams = z.object({
  date: z.string().optional(),
});

type SchedulingCreateDTO = z.infer<typeof createSchema>;
type SchedulingUpdateDTO = z.infer<typeof updateSchema>;
type SchedulingParamsDTO = z.infer<typeof paramsSchema>;
type SchedulingQueryDTO = z.infer<typeof queryParams>;

export class SchedulingService {
  static async create(data: SchedulingCreateDTO) {
    const { date, status, service, clientId, notes } = createSchema.parse(data);

    const client = await prisma.client.findUnique({ where: { id: clientId } });

    if (!client) {
      throw new AppError("Cliente não encontrado", 404);
    }

    const scheduling = await prisma.schedule.create({
      data: {
        date: date,
        status: status,
        service: service,
        clientId: clientId,
        notes: notes,
      },
    });

    return scheduling;
  }

  static async index(query?: SchedulingQueryDTO) {
    const { date } = queryParams.parse(query ?? {});

    let where = {};

    if (date) {
      const startDay = new Date(`${date}T00:00:00.000Z`);
      const endDay = new Date(`${date}T23:59:59.999Z`);

      where = {
        date: {
          gte: startDay,
          lte: endDay,
        },
      };
    }

    const schedulings = await prisma.schedule.findMany({
      where,
      select: {
        id: true,
        client: { select: { name: true, phone: true } },
        date: true,
        service: true,
        status: true,
        notes: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return schedulings;
  }

  static async update(id: SchedulingParamsDTO, data: SchedulingUpdateDTO) {
    const { schedulingId } = paramsSchema.parse(id);
    const { date, status, service, notes } = updateSchema.parse(data);

    const fetchScheduling = await prisma.schedule.findUnique({
      where: { id: schedulingId },
    });

    if (!fetchScheduling) {
      throw new AppError("Agendamento não encontrado", 404);
    }

    if (fetchScheduling.status === "CANCELADO") {
      throw new AppError(
        "Não é possível alterar o status de um agendamento cancelado",
        404
      );
    }

    const scheduling = await prisma.schedule.update({
      where: { id: schedulingId },
      data: {
        date: date,
        notes: notes,
        service: service,
        status: status,
      },
    });

    return scheduling;
  }

  static async delete(id: SchedulingParamsDTO) {
    const { schedulingId } = paramsSchema.parse(id);

    const scheduling = await prisma.schedule.findUnique({
      where: { id: schedulingId },
    });

    if (!scheduling) {
      throw new AppError("Agendamento não encontrado", 404);
    }

    await prisma.schedule.delete({ where: { id: schedulingId } });

    return;
  }
}
