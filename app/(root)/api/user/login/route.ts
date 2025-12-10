import prisma from "@/app/(root)/api/lib/PrismaClient";
import { hashCode, random } from "@/app/(root)/api/lib/Authentication";
import { NextResponse } from "next/server";

/**
 * Login. After validating the email and password, generate a session token
 * and send to both client and database.
 * @param req The request body json must contain `email` and `password`
 * @constructor
 */
export async function POST(req: Request) {
  try {
    // input check
    let { email, password } = await req.json();
    if (!email || !password)
      return Response.json("Please input correct email and password.", {
        status: 400,
      });

    // get user information from db
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) return Response.json("Invalid credentials.", { status: 401 });

    // check password
    const expectedHash = hashCode(user.salt, password);
    if (expectedHash !== user.hash)
      return Response.json("Invalid credentials.", { status: 401 });

    // remove authentication information from the object
    // @ts-ignore
    delete user.sessionToken;
    // @ts-ignore
    delete user.hash;
    // @ts-ignore
    delete user.salt;

    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.error();
  }
}
