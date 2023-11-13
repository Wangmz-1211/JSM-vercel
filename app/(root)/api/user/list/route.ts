import prisma from '../../lib/PrismaClient'

/**
 * Get the whole user list.
 */
export async function GET() {
	try {
		const users = await prisma.users.findMany(
			{
				select: {
					id: true,
					email: true,
					username: true,
					avatar: true,
					// hash: true,
					// salt: true,
					// sessionToken: true
				}
			}
		)
		return Response.json(users)
	} catch
		(e) {
		console.log(e)
		return Response.error();
	}
}
