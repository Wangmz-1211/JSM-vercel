import { auth} from "@/lib/auth";

export default async function Home() {
	const session = await auth()

	console.log(session)
	return <div>
		{/*// @ts-ignore*/}
		{session? `Hello, ${session.user.name}.`: "Please sign in."}
	</div>
}
