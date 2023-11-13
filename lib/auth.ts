import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next"
import type {NextAuthOptions} from "next-auth"
import {getServerSession} from "next-auth"
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
	providers: [
		GithubProvider({
			// @ts-ignore
			clientId: process.env.GH_ID,
			// @ts-ignore
			clientSecret: process.env.GH_SECRET,
			userinfo: {
				url: 'https://api.github.com/user',
			}
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: "email",
					type: 'text'
				},
				password: {
					label: "password",
					type: "password"
				}
			},
			// @ts-ignore
			async authorize(credentials, req) {
				const res = await fetch(process.env.NEXTAUTH_URL + "/api/user/login", {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: {
						"Content-Type": "application/json"
					}
				})
				if (!res.ok) return null
				const user = await res.json()
				if (!user) return null
				const dto = {
					name: user.username,
					email: user.email,
					image: user.avatar
				}
				// console.log(user, dto)
				return dto
			}


		})
	], // rest of your config
	pages: {
		signIn: '/sign-in',
	}
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
	return getServerSession(...args, config)
}