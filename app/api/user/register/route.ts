import prisma from "@/app/api/lib/PrismaClient";
import {hashCode, random} from "@/app/api/lib/Authentication";

/**
 * <h2>Register</h2>
 * The request body: <br/>
 * <ul>
 *   <li><b>email</b>: the email <i>cannot</i> be the same as any records in the database.</li>
 *   <li><b>password</b></li>
 *   <li><b>username</b>: multiple users could have a same username</li>
 *   <li><b>(avatar)</b>: this is optional, url of the image.</li>
 * </ul>
 * @param req
 * @constructor
 */
export async function POST(req: Request) {
	try {
		let {email, username, password, avatar} = await req.json()
		console.log(email, username, password, avatar)
		if (!email || !username || !password) return Response.json("incomplete request body", {status: 400})
		// check email existence
		const user = await prisma.users.findFirst({
			where: {email: email},
			select: {id: true, username: true}
		})
		// Meeting a duplicate email, may be the user have registered before with this email
		// the username returned can be used to check if the account belongs to the user.
		if (user) return Response.json('Is ['+user.username+'] your account?', {status: 400})
		// register
		const salt = random()
		const hash = hashCode(salt, password)
		await prisma.users.create({
			data: {
				email,
				username,
				avatar,
				salt,
				hash,
				sessionToken: random(),
				// I don't know what is this attribute means,
				// but it is automatically generate by mongodb.
				v: 0
			}
		})
		return Response.json(null, {status: 200})

	} catch (e) {
		console.error(e)
		return Response.error()
	}
}