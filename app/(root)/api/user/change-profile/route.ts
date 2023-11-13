import prisma from "@/app/(root)/api/lib/PrismaClient";

/**
 * Change the profile of a user. The username and avatar will be updated by this API.
 * The `username` and `avatar` in the request body refers to the new ones.
 *
 * @param req `{ email: string, username: string, avatar: string(optional)}`
 * @constructor
 */
export async function POST(req: Request) {
	try {
		let {email, username, avatar} = await req.json()
		if (!email || !username) return Response.json("information not enough", {status: 400})
		const user = await prisma.users.findFirst({
			where: {email},
			select: {
				id: true,
				email: true,
				username: true,
				avatar: true
			}
		})
		if (!user) return Response.json("user doesn't exist", {status: 400})
		const data = {}
		if (username !== user.username) {
			// @ts-ignore
			data.username = username
		}
		if (avatar !== user.avatar) {
			// @ts-ignore
			data.avatar = avatar
		}
		await prisma.users.update({where: {id: user.id}, data})
		return Response.json(null, {status: 200})


	} catch (e) {
		console.error(e)
		return Response.error()
	}
}