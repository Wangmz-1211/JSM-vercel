import prisma from "@/app/(root)/api/lib/PrismaClient";

/**
 * Delete a user from database, and cannot be restored.
 * !This could be dangerous.
 * @param req `{email: string}`
 * @constructor
 */
export async function DELETE(req: Request) {
	try {
		let {email} = await req.json()
		if (!email) return Response.json(null, {status: 400})
		// check the presence of the user
		const user = await prisma.users.findFirst({
			where: {email},
			select: {id: true}
		})
		if (!user) return Response.json(null, {status: 400})
		await prisma.users.delete({where: {id: user.id}})
		return Response.json("Sayonara", {status: 200})
	} catch (e) {
		console.error(e)
		return Response.error()
	}
}