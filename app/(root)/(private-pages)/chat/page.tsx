import Chat from "@/app/(root)/(private-pages)/chat/components/chat";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";

const ChatPage = async () => {
    const session = await auth()
    if (!session) redirect('/sign-in')
    return (
        <main className="
        pt-4  w-full flex flex-col justify-between
        flex-shrink
		 items-center
		">
            <Chat/>
        </main>
    );
};
export default ChatPage