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
import Link from "next/link";

const FormSchema = z.object({
	email: z.string().email(),
	username: z.string()
		.min(3, {message: "Username must be at least 2 characters"})
		.max(24, {message: "Username must be as most 24 characters"}),
	password: z.string()
		.min(3, {message: "Password must be at least 2 characters"})
		.max(24, {message: "Password must be as most 24 characters"}),
})


const SignUpForm = () => {

	const router = useRouter()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			username: "",
			password: ""
		}
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const response = await fetch('/api/user/register', {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		})
		if (response.ok) {
			router.push('/sign-in')
		} else {
			const errorInfo = response.status === 400 ?
				await response.text().then(s => s.replaceAll(/"/, "")) :
				"server error";
			// show message
			console.error(errorInfo)
		}
	}


	return (
		<Form {...form}>
			<form
				className="flex w-4/5 md:w-1/2 lg:w-2/5 mx-auto
				 flex-col gap-4 justify-center items-center
			 text-sm border border-neutral-300 dark:border-neutral-700 p-4
			 rounded-xl"
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
					name="username"
					render={({field}) => (
						<FormItem className="w-full">
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input {...field} type="text"></Input>
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
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input {...field} type="password"></Input>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<Button className="w-full bg-green-700 hover:bg-green-600" type='submit'>Sign up</Button>
				<span>Have an account? <Link href="/sign-in" className="text-blue-400">Sign in</Link></span>
			</form>
		</Form>
	);
};

export default SignUpForm