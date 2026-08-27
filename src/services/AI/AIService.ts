import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { GenerateCaptionDTO } from "../../dtos/GenerateCaptionDTO";
import { buildCaptionPrompt } from "./prompts/caption.prompt";

class AIService {
  private readonly model: GenerativeModel;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não encontrada.");
    }

    this.model = new GoogleGenerativeAI(apiKey).getGenerativeModel({
      model: "gemini-3.5-flash-lite",
    });
  }

  async generationSubtitle(data: GenerateCaptionDTO) {
    const prompt = buildCaptionPrompt(data);

    const result = await this.model.generateContent(prompt);

    return result.response.text();
  }
}

export default new AIService();
