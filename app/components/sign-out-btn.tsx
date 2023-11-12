'use client'

import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";

const SignOutBtn = () => {
	return (
		<Button
			className="w-24 h-8 text-[1rem] leading-1 bg-jred hover:bg-red-700 py-0 px-2"
			onClick={() => {
				signOut({
					redirect: true,
					callbackUrl: '/'
				})
			}}
		>
			Sign out
		</Button>
	)
}
export default SignOutBtn