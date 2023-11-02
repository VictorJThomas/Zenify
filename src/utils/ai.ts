import { GooglePaLM } from "langchain/llms/googlepalm";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'
import { PromptTemplate } from 'langchain/prompts'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z
            .string()
            .describe('Diagnose the user message and identify its mood. It could be one of the follows: sadness, anxiety, happiness, rage, depression, loneliness.'),
        advice: z
            .string()
            .describe('Generate short diagnose based on the user input and a short advice for him.')
    })
)

const getPrompt = async (userMessage: string) => {
    const formatInstructions = parser.getFormatInstructions()
    const prompt = new PromptTemplate({
        template: 'You are a chatbot for a mental health app, people will tell you about their mood and feelings and you have to identify their condition (sad, has anxiety, happiness, rage, depression, loneliness, trust, or any other) and give some advice in order to help. If the input is in spanish, translate your response. Try not to create a large response (800 characters as much). First, show the diagnose, then the advices. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions: formatInstructions },
    })

    const input = await prompt.format({
        entry: userMessage,
    })

    return input
}

export const analyze = async (userMessage: string) => {

    const input = await getPrompt(userMessage)
    const model = new GooglePaLM({
        temperature: 1,
    })

    const responses = await model.call(input);
   
    const parsedResult = await parser.parse(responses)
    try {
        return parsedResult
    } catch (e) {
        return { mood: 'Error', advice: 'An error occurred while processing your request.' };
    }

}