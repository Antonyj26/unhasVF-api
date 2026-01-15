import { z } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";

const regexPhone = /^(?:\(?\d{2}\)?\s?)(?:9\d{4}|\d{4})-?\d{4}$/;

const createSchema = z.object({
  name: z.string().min(3, "Nome deve ter mais de 3 caracteres"),
  phone: z.string().regex(regexPhone, "Telefone inválido. Informe o DDD."),
});

const updateSchema = z.object({
  name: z.string().min(3, "Nome deve ter mais de 3 caracteres").optional(),
  phone: z
    .string()
    .regex(regexPhone, "Telefone inválido. Informe o DDD.")
    .optional(),
});

const paramsShowSchema = z.object({
  clientId: z.string().uuid("ID inválido"),
});

const queryParams = z.object({
  name: z.string().optional(),
});

type ClientServiceDTO = z.infer<typeof createSchema>;
type ClientParamsDTO = z.infer<typeof paramsShowSchema>;
type ClientUpdateDTO = z.infer<typeof updateSchema>;
type ClientQueryDTO = z.infer<typeof queryParams>;

export class ClientService {
  static async create(data: ClientServiceDTO) {
    const { name, phone } = createSchema.parse(data);

    const client = prisma.client.create({
      data: {
        name: name,
        phone: phone,
      },
    });

    return client;
  }

  static async index(query?: ClientQueryDTO) {
    const { name } = queryParams.parse(query ?? {});

    let where = {};

    if (name) {
      where = {
        name: {
          contains: name,
          mode: "insensitive",
        },
      };
    }

    const clients = await prisma.client.findMany({
      where,
      select: {
        id: true,
        name: true,
        phone: true,
      },
    });

    if (clients.length === 0) {
      throw new AppError("Nenhum cliente encontrado", 404);
    }

    return clients;
  }

  static async show(id: ClientParamsDTO) {
    const { clientId } = paramsShowSchema.parse(id);

    const client = prisma.client.findUnique({
      where: { id: clientId },
      select: {
        id: true,
        name: true,
        phone: true,
        schedules: {
          select: {
            id: true,
            date: true,
            status: true,
            service: true,
          },
        },
      },
    });

    if (!client) {
      throw new AppError("Cliente não encontrado", 404);
    }

    return client;
  }

  static async delete(id: ClientParamsDTO) {
    const { clientId } = paramsShowSchema.parse(id);

    const client = await prisma.client.findUnique({ where: { id: clientId } });

    if (!client) {
      throw new AppError("Cliente não encontrado", 404);
    }

    await prisma.client.delete({ where: { id: clientId } });

    return;
  }

  static async update(id: ClientParamsDTO, data: ClientUpdateDTO) {
    const { clientId } = paramsShowSchema.parse(id);

    const clientExisting = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!clientExisting) {
      throw new AppError("Cliente não encontrado", 404);
    }

    const { name, phone } = updateSchema.parse(data);

    const client = await prisma.client.update({
      where: { id: clientId },
      data: { name: name, phone: phone },
    });

    return client;
  }
}
