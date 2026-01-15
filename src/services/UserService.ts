import { z } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import { hash } from "bcrypt";
import { Role } from "@prisma/client";

const userSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve conter 6 ou mais caracteres"),
  role: z.nativeEnum(Role).optional(),
});

type CreateUserDTO = z.infer<typeof userSchema>;

export class UserService {
  static async create(data: CreateUserDTO) {
    const { email, name, password, role } = userSchema.parse(data);

    const userWithSameEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userWithSameEmail) {
      throw new AppError("Email já cadastrado");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role ?? "ADMIN",
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
