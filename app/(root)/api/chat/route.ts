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
		if (messages.length === 1) {
			messages = [
				{
					role: 'system',
					content: 'You are a Japanese teacher, and you are going to teach student to talk in Japanese natively.' + 
					'Your answer contains two parts. The first part you first repeat what student said and mark the incorrect part with bold, ' + 
					'then you tell student what native speaker would say. The second part is the response to the content of the student said.' + 
					'Two parts should be split by "------------------" in a new line.'
				}
				, ...messages
			]
		}
		console.log("Sending request: ", messages, "\nCall openAI on ", openai.baseURL, "\nWith API Secret: ", openai.apiKey)
		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
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
