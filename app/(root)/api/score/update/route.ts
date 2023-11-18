import prisma from "@/app/(root)/api/lib/PrismaClient";
import {
	vocabularyPart,
	grammarPart,
	readingPart,
	listeningPart,
	totalScoreCalculator
} from "@/app/(root)/api/lib/ScoreCalculater";

/**
 * Update the score record of a user's own.
 * @param req the request body should look like this: ```
 * {
 *   ! control or identify information
 *   id: string (this is the id of the score record),
 *   user_email: string (no matter which way to sign in, this is available),
 *
 *   ! detail information
 *   v1: number,
 *   v2: number,
 *   v3: number,
 *   v4: number,
 *   v5: number,
 *   v6: number,
 *   g7: number,
 *   g8: number,
 *   g9: number,
 *   r10: number,
 *   r11_1: number,
 *   r11_2: number,
 *   r12: number,
 *   r13: number,
 *   r14: number,
 *   l1: number,
 *   l2: number,
 *   l3: number,
 *   l4: number,
 *   l5: number,
 * }
 * ```
 * @constructor
 */
export async function PUT(req: Request) {
	try {
		const body = await req.json()
		if (!body || !body.id || !body.user_email) return Response.json(null, {status: 400})
		const oldRecord = await prisma.scores.findUnique({
			where: {id: body.id}
		})
		if (!oldRecord) return Response.json("record doesn't exist.", {status: 400})
		const vocabulary = {
			v1: body.v1,
			v2: body.v2,
			v3: body.v3,
			v4: body.v4,
			v5: body.v5,
			v6: body.v6
		}
		const vocabulary_score = vocabularyPart(vocabulary)
		const grammar = {
			g7: body.g7,
			g8: body.g8,
			g9: body.g9
		}
		const grammar_score = grammarPart(grammar)
		const reading = {
			r10: body.r10,
			r11_1: body.r11_1,
			r11_2: body.r11_2,
			r12: body.r12,
			r13: body.r13,
			r14: body.r14
		}
		const reading_score = readingPart(reading)
		const listening = {
			l1: body.l1,
			l2: body.l2,
			l3: body.l3,
			l4: body.l4,
			l5: body.l5
		}
		const listening_score = listeningPart(listening)
		const total_score = vocabulary_score + grammar_score + reading_score + listening_score
		const newRecord = await prisma.scores.update({
			where: {
				id: body.id,
				user_email: body.user_email
			},
			data: {
				vocabulary,
				vocabulary_score,
				grammar,
				grammar_score,
				reading,
				reading_score,
				listening,
				listening_score,
				total_score
			}
		})
		return Response.json(newRecord, {status: 200})
	} catch (e) {
		console.error(e)
		return Response.error()

	}
}