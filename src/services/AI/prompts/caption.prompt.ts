import { GenerateCaptionDTO } from "../../../dtos/GenerateCaptionDTO";

export function buildCaptionPrompt(data: GenerateCaptionDTO): string {
    return `Você é especialista em marketing para Instagram de uma nail designer.

    Crie uma legenda para Instagram.
    
    Serviço:
    ${data.service}
    
    Descrição:
    ${data.description}
    
    Estilo:
    ${data.style}
    
    Regras:
    
    - Use poucos emojis.
    - Gere uma legenda envolvente.
    - Finalize incentivando o agendamento através de mensagem no direct ou através do contato na bio.
    - Retorne somente a legenda.` }