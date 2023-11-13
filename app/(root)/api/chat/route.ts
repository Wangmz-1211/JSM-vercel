import {OpenAI} from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: Request) {
	try {
		const {messages} = await req.json()
		const data = await openai.chat.completions.create({
			model: "gpt-4-1106-preview",
			messages: messages,
			max_tokens: 256
		})
		return Response.json(data.choices, {status: 200})

	} catch (e) {
		console.error(e)
		return Response.error()
	}
}