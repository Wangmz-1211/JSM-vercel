import {OpenAI} from "openai";
import {OpenAIStream, StreamingTextResponse} from 'ai'
// import prisma from "@/app/(root)/api/lib/PrismaClient";

export const runtime = "edge"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: Request) {
    try {
        let {messages} = await req.json()
        console.log(messages)
        if (messages.length === 1) {
            messages = [
                {
                    role: 'system',
                    content: 'You are a Japanese language teacher, and you focus on teaching student how to' +
                        'reach a higher score in JLPT test. You always give advices that could make students' +
                        'make progress fast.'
                }
                , ...messages
            ]
        }
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages,
            stream: true,
            max_tokens: 1024
        })
        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}
