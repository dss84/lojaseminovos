import { GoogleGenAI } from "@google/genai";
import { Car } from "../types";

// Verificar se a API Key está configurada
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const isGeminiConfigured = apiKey && apiKey !== '';

// Inicializar apenas se a API Key estiver configurada
let ai: GoogleGenAI | null = null;
if (isGeminiConfigured) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateCarDescription = async (car: Partial<Car>): Promise<string> => {
  // Se o Gemini não estiver configurado, retornar descrição padrão
  if (!ai || !isGeminiConfigured) {
    console.warn('⚠️ Gemini API não configurada. Usando descrição padrão.');
    return `${car.make} ${car.model} ${car.year}, ${car.type} com motor ${car.fuel} e câmbio ${car.transmission}. Veículo em excelente estado de conservação, com ${car.mileage?.toLocaleString('pt-BR')} km rodados. Cor ${car.color}. Oportunidade única!`;
  }

  try {
    const prompt = `
      Escreva uma descrição de venda atraente, profissional e persuasiva para um site de carros seminovos (em Português do Brasil).
      Use no máximo 2 parágrafos. Enfatize os pontos fortes. Não invente defeitos.
      
      Dados do Veículo:
      Marca: ${car.make}
      Modelo: ${car.model}
      Ano: ${car.year}
      Tipo: ${car.type}
      Combustível: ${car.fuel}
      Câmbio: ${car.transmission}
      Quilometragem: ${car.mileage} km
      Cor: ${car.color}
      Opcionais/Recursos: ${car.features?.join(', ')}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Descrição indisponível no momento.";
  } catch (error) {
    console.error("Erro ao gerar descrição com Gemini:", error);
    return "Não foi possível gerar a descrição automática. Por favor, escreva manualmente.";
  }
};
