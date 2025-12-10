import prisma from "@/app/(root)/api/lib/PrismaClient";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

/**
 * When a user want to log out safely, call this API.
 * This will clear the session token both in client and in database.
 * @param req the api effects only with a cookie
 * @constructor
 */
export async function POST(req: Request) {
	try {
		const cookieStore = await cookies()
		const sessionToken = cookieStore.get('sessionToken')
		if (!sessionToken) return Response.json(null, {status: 400})
		const user = await prisma.users.findFirst({
			where: {
				sessionToken: sessionToken.value
			}
		})
		if (!user) return Response.json('token expired', {status: 400})
		await prisma.users.update({
			where: {
				id: user.id
			},
			data: {
				sessionToken: ""
			}
		})
		const response = new NextResponse(null, {status: 200})
		response.cookies.set({
			name: 'sessionToken',
			value: '',
			maxAge: 0,
			path: '/'
		})
		return response


	} catch (e) {
		console.error(e)
		return Response.error()
	}
}