import prisma from "@/app/(root)/api/lib/PrismaClient";

export async function GET() {
	try {
		const chats = await prisma.chats.findMany({take: 10})
		// console.log(chats)
		return Response.json(chats, {status: 200})
	} catch (e) {
		console.error(e)
		return Response.error()
	}
}