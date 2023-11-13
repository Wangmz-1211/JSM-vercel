import {OpenAI} from "openai";
import prisma from "@/app/(root)/api/lib/PrismaClient";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: Request) {
	try {
		const {chats} = await req.json()
		if (!chats) return Response.json(null, {status: 400})
		const data = await openai.chat.completions.create({
			model: "gpt-4-1106-preview",
			messages: chats.messages,
			max_tokens: 1024
		})
		chats.messages.push(data.choices[0].message)
		let res: Record<string, any>;
		if (chats.id === 'new') {
			res = await prisma.chats.create({
				data: {
					v: 0,
					messages: chats.messages,
					user_email: chats.user_email
				}
			})
		} else {
			res = await prisma.chats.update({
				where: {
					id: chats.id,
					user_email: chats.user_email,
				},
				data: {
					messages: chats.messages
				}
			})
		}
		return Response.json(res, {status: 200})

	} catch (e) {
		console.error(e)
		return Response.error()
	}
}
