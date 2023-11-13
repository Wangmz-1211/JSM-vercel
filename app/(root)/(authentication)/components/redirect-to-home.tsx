import {auth} from "@/lib/auth";
import { redirect} from "next/navigation";

const RedirectToHome = async () => {
	const session = await auth()
	if( session ) redirect('/')
	return (
		<span></span>
	)
}
export default RedirectToHome