import prisma from "@/app/(root)/api/lib/PrismaClient";
import {auth} from "@/lib/auth";
import {NextApiRequest, NextApiResponse} from "next";

/**
 * Create a blank score record
 * @param req the body should look like this ```json
 * {
 *  title: string,
 *  user_email: string
 * }
 * ```
 * @constructor
 */
export async function PUT(req: Request) {
	try {
		const body = await req.json()
		if (!body || !body.title || !body.user_email)
			return Response.json("title is needed", {status: 400})
		const record = await prisma.scores.create({
			data: {
				user_email: body.user_email,
				title: body.title,
				v: 0,
				vocabulary: {
					v1: 0,
					v2: 0,
					v3: 0,
					v4: 0,
					v5: 0,
					v6: 0
				},
				grammar: {
					g7: 0,
					g8: 0,
					g9: 0
				},
				reading: {
					r10: 0,
					r11_1: 0,
					r11_2: 0,
					r12: 0,
					r13: 0,
					r14: 0,
				},
				listening: {
					l1: 0,
					l2: 0,
					l3: 0,
					l4: 0,
					l5: 0,
				},
				vocabulary_score: 0,
				grammar_score: 0,
				reading_score: 0,
				listening_score: 0,
				total_score: 0
			}
		})
		return Response.json(record, {status: 200})
	} catch (e) {
		console.error(e)
		return Response.error()
	}
}