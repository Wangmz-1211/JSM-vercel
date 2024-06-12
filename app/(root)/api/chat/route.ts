import {OpenAI} from "openai";
import {OpenAIStream, StreamingTextResponse} from 'ai'

export const runtime = "edge"
export const preferredRegion = [
	'arn1',
	'bom1',
	'cdg1',
	'cle1',
	'cpt1',
	'dub1',
	'fra1',
	'gru1',
	// 'hkg1', ip blocked by openai
	'hnd1',
	'iad1',
	'icn1',
	'kix1',
	'lhr1',
	'pdx1',
	'sfo1',
	'sin1',
	'syd1',
]

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
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
						'reach a higher score in JLPT test. You can advices that could make students' +
						'make progress fast. You use the same language as student.'
				}
				, ...messages
			]
		}
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
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
