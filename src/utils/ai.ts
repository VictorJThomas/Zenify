import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";

// Define el esquema de salida usando Zod
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe(
        "Diagnose the user message and identify its mood. It could be one of the follows: sadness, anxiety, happiness, rage, depression, loneliness."
      ),
    advice: z
      .string()
      .describe(
        "Generate short diagnose based on the user input and a short advice for him."
      ),
  })
);

// Función para obtener un prompt formateado en formato JSON
const getPrompt = async (userMessage: string) => {
  const formattedPrompt = {
    entry: userMessage,
    format_instructions: parser.getFormatInstructions(),
  };

  const prompt = JSON.stringify(formattedPrompt);
  return prompt;
};

// Función para analizar el mensaje del usuario
export const analyze = async (userMessage: string) => {
  const input = await getPrompt(userMessage);

  // OpenAI GooglePaLM
  const model = new OpenAI({
    temperature: 1,
  });

  const responses = await model.call(input);

  // Analizar las respuestas utilizando el analizador estructurado definido
  const parsedResult = await parser.parse(responses);

  try {
    return parsedResult;
  } catch (e) {
    return {
      mood: "Error",
      advice: "An error occurred while processing your request.",
    };
  }
};
