'use client'
import {signIn} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {Github} from "lucide-react";

export default function OAuthSignIn() {
	return (
		<Button
			onClick={() => signIn('github', {
				redirect: true,
				callbackUrl: '/'
			})}
			className="space-x-2 w-full text-center text-sm leading-3">
			<Github/>
			<span>
				Sign in with Github
			</span>
		</Button>
	)
}