import prisma from "@/app/api/lib/PrismaClient";

export async function DELETE(req: Request) {
	try {
		const body = await req.json()
		if (!body || !body.id) return Response.error()
		await prisma.scores.delete({where: {id: body.id}})
		return Response.json(null, {status: 200})
	} catch (e) {
		console.error(e)
		return Response.error()
	}

}