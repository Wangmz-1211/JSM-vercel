import prisma from "@/app/api/lib/PrismaClient";
import {random, hashCode} from "@/app/api/lib/Authentication";

/**
 * Change the password of the user after validating the old password.
 * @param req `{email: string, oldPassword: string, newPassword: string}`
 * @constructor
 */
export async function POST(req: Request) {
	try {
		let {email, oldPassword, newPassword} = await req.json()
		if (oldPassword === newPassword) return Response.json(null, {status: 400})
		const user = await prisma.users.findFirst({
			where: {email},
			select: {
				id: true,
				salt: true,
				hash: true
			}
		})
		if (!user) return Response.json('invalidate email', {status: 400})
		const expectedHash = hashCode(user.salt, oldPassword)
		if (expectedHash !== user.hash) return Response.json('wrong password', {status: 400})
		const newSalt = random()
		const newHash = hashCode(newSalt, newPassword)
		await prisma.users.update({
			where: {id: user.id},
			data: {
				salt: newSalt,
				hash: newHash
			}
		})
		return Response.json(null, {status: 200})

	} catch (e) {
		console.error(e)
		return Response.error()

	}
}