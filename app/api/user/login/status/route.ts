import prisma from "@/app/api/lib/PrismaClient";
import {cookies} from "next/headers";

/**
 * An API for client to check the sign-in status of the user.
 * If the user has logged in, this would return the base information of the user.
 * This can be used to fetch the user information after a page refresh.
 * @param req `{ sessionToken: string}` the sessionToken is expected to be contained in the req body.
 * @constructor
 */
export async function POST(req: Request) {
	try {
		const cookieStore = cookies()
		const sessionToken = cookieStore.get('sessionToken')
		if (!sessionToken) return Response.json("you haven't login", {status: 403})
		const user = await prisma.users.findFirst({
			where: {
				sessionToken: sessionToken.value
			},
			select: {
				id: true,
				email: true,
				username: true,
				avatar: true
			}
		})
		if(!user) return Response.json("token expired", {status: 403})
		return Response.json(user, {status: 200})

	} catch (e) {
		console.error(e)
		return Response.error()

	}
}