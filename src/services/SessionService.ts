import { z } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { authConfig } from "../configs/auth";

const bodySchema = z.object({
  email: z.string().email("email inválido"),
  password: z.string(),
});

type SessionServiceDTO = z.infer<typeof bodySchema>;

export class SessionService {
  static async create(data: SessionServiceDTO) {
    const { email, password } = bodySchema.parse(data);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("E-mail ou senha inválido", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha inválido", 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    } as any);

    const { password: _, ...userWithoutPassword } = user;

    return { token, userWithoutPassword };
  }
}
