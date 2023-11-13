import prisma from '../../lib/PrismaClient'

/**
 * An authorization service for other services.
 * !No user should ever call this API.
 * @param req `{ sessionToken: string}`<br/> the sessionToken must be contained in the body json
 * @constructor
 */
export async function POST(req: Request) {
	try {
		let {sessionToken} = await req.json()
		if (!sessionToken) return Response.error()

		const user = await prisma.users.findFirst({
			where: {
				sessionToken
			},
			select: {
				id: true,
				email: true,
				username: true,
				avatar: true
			}
		})
		if (!user) return Response.json("user doesn't exist or login status expired", {status: 400})
		return Response.json(user, {status: 200})

	} catch (e) {
		console.error(e)
		return Response.error()
	}

}