'use client'

import {Input} from "@/components/ui/input";
import {
	Form,
	FormControl, FormField, FormItem
} from "@/components/ui/form";
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {useState} from "react";

const formSchema = z.object({
	message: z.string()
})

const AskChatGPT = (
	{
		session
	}: {
		session: {
			user: {
				name: string,
				email: string,
				image: string
			}
		} & any
	}) => {


	const [waiting, setWaiting] = useState(false)


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: ''
		}

	})

	if (!session) return null
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setWaiting(true)
		const res = await fetch(`${process.env.NEXTAUTH_URL}/api/chat`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				chats: {
					id: 'new',
					user_email: session.user.email,
					messages: [
						{role: 'system', content: 'You are a Japanese language teacher. Focusing on JLPT Test.'},
						{role: 'user', content: values.message}
					]
				}
			})
		})
		const message = res.json()
		console.log(message)
		setWaiting(false)
		// document.location.reload()

	}

	return (
		<div>
			<p className="text-sm text-neutral-500 my-1">ask ChatGPT, this takes a few minutes.</p>
			<Form {...form}>
				<form
					className="flex flex-row space-x-2"
					onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='message'
						render={({field}) => (
							<FormItem className="w-full">
								<FormControl>
									<Input {...field} className="w-full"/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={waiting}>Send</Button>
				</form>
			</Form>

		</div>
	);
};
export default AskChatGPT
