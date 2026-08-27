import { Request, Response } from "express";
import AIService from "../services/AI/AIService";
import { success, z, ZodAny, ZodError } from "zod";

const generateCaptionSchema = z.object({
  service: z.string().min(1, "O serviço é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  style: z.enum(["Elegante", "Descontraído", "Luxuoso"]),
});

export class AIController {
  async generationSubtitle(req: Request, res: Response) {
    try {
      const data = generateCaptionSchema.parse(req.query);

      const subtitle = await AIService.generationSubtitle(data);

      return res.status(200).json({
        success: true,
        subtitle,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          error: error.issues,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Erro ao gerar legenda.",
      });
    }
  }
}
