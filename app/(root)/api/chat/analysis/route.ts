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

type ChatCompletionMessageParam = {
	role: string,
	content: string
}

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

const systemMessage: ChatCompletionMessageParam = {
	role: "system",
	content: 'You are a Japanese teacher, focus on the JLPT test.' +
		"You are going to check the history of a student's practice test score lists," +
		"analysis it, and give the students advice on how to promote the score." +
		"There are four sections: vocabulary, grammar, reading and listening. The " +
		"score list would contains the score of each sections. " +
		"The max score of each section is: vocabulary - 38, grammar - 22, and that of the" +
		"left two sections are both 60." +
		"The max total score is 180, and 90 is the pass line." +
		"The title formats like 'N2-2012-07', where N2 is the level, 2012 is the year, and 07 is month." +
		"The whole score list is in a json format." +
		"You prefer Chinese, and call the student 'you' rather than 'this student'"
}

export async function POST(req: Request) {
	try {
		let {messages} = await req.json()

		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				systemMessage,
				messages[0]
			],
			stream: true,
			max_tokens: 2048
		})
    
        console.log("The request is: ", response)

		const stream = OpenAIStream(response)
		return new StreamingTextResponse(stream)
	} catch
		(e) {
		console.error(e)
		return Response.error()
	}
}
