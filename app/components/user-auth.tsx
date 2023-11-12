import {auth} from '@/lib/auth'
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import SignOutBtn from "@/app/components/sign-out-btn";


const UserAuth = async () => {
	const session = await auth()
	if (!session) return (
		<div className="space-x-2">
			<Link href="/sign-in">
				<Button variant="ghost">
					Sign in
				</Button>
			</Link>
			<Link href="/sign-up">
				<Button className="bg-jred">
					Sign up
				</Button>

			</Link>
		</div>
	);
	else return (
		<div>
			<Popover>
				<PopoverTrigger>
					<Avatar>
						<AvatarImage src={session.user!.image!}/>
						<AvatarFallback>{session.user!.name}</AvatarFallback>
					</Avatar>
				</PopoverTrigger>
				<PopoverContent
					className="w-24 flex justify-center p-0.5 translate-y-full -translate-x-1/4"
					side="left"
					sideOffset={-32}>
					<SignOutBtn/>

				</PopoverContent>
			</Popover>
		</div>
	)


}
export default UserAuth