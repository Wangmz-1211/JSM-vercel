'use client'


import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {useRouter} from "next/navigation";
import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import Link from 'next/link'
import {signIn} from "next-auth/react";

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string()
		.min(3, {message: "Password must be at least 2 characters"})
		.max(24, {message: "Password must be as most 24 characters"}),
})

const CredentialsForm = () => {

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: true,
			callbackUrl: '/'
		})
	}

	return (
		<Form {...form}>
			<form
				className="flex w-full flex-col gap-4 justify-center items-center
			 text-sm border-b pb-3"
				onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({field}) => (
						<FormItem className="w-full">
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input {...field} type="email"></Input>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({field}) => (
						<FormItem className="w-full">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input {...field} type="password"></Input>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<Button className="w-full bg-green-700 hover:bg-green-600" type='submit'>Sign in</Button>
				<span>Don&apos;t have an account? <Link href="/sign-up" className="text-blue-400">Sign up</Link></span>
			</form>
		</Form>
	);
}

export default CredentialsForm;
