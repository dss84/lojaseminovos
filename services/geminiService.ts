import { GoogleGenAI } from "@google/genai";
import { Car } from "../types";

// Note: In a real production app, this call would go to your own backend to protect the API key.
// For this frontend-only demo, we access the env var directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCarDescription = async (car: Partial<Car>): Promise<string> => {
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
