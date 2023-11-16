'use client'
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {Loader2} from "lucide-react";

const message = 'The title must be in the specific formation. e.g. "N2-2023-12"'

const formSchema = z.object({
	title: z.string()
		.min(10, {message})
		.max(10, {message})
})

const ScoreCreateForm = () => {

	const {data} = useSession()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: ""
		}
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		const response = await fetch('/api/score/create', {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				title: values.title,
				user_email: data?.user?.email
			})
		})
		if (response.ok) {
			const js = await response.json()
			console.log(js)
			setIsLoading(false)
			document.location.reload()
		} else {
			const text = await response.text()
			console.log(text)
		}


	}

	return (<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name='title'
					render={({field}) => {
						return (<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									{...field}
								/>
							</FormControl>
							<FormMessage/>
						</FormItem>)
					}}
				/>
				<Button disabled={isLoading} type='submit' className="float-right relative">
					Create
					{isLoading &&
              <Loader2
                  className="animate-spin absolute bottom-2 text-secondary "/>}
				</Button>
			</form>
		</Form>

	)
}
export default ScoreCreateForm