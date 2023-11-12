import prisma from '../../lib/PrismaClient'

/**
 * Get the specified user information without authentication info.
 * @param _
 * @param params path param
 */
export async function GET(_: any, {params}: { params: { id: string } }) {
	try {
		if (!/[0-9a-f]{24}/.test(params.id)) return Response.error()
		const user = await prisma.users.findUnique({
			where: {
				id: params.id
			},
			select: {
				id: true,
				email: true,
				username: true,
				avatar: true
			}
		})
		if (!user) return Response.error()
		return Response.json(user)
	} catch (e) {
		console.error(e)
		return Response.error()
	}
}