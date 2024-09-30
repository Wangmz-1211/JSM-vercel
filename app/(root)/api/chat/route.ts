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
					content: 'You are a Japanese teacher and will teach students to speak Japanese like a native. **Your answer consists of two parts.** In the first part, first repeat what the student said and mark the incorrect part in bold. Then tell the student what a native speaker would say. In the second part, respond to the content that the student said. However, if the student speaks natively enough, the first part is not needed. The two parts should be separated by "------------------" on a new line. The whole answer should be in Japanese unless specified by the student.'
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
