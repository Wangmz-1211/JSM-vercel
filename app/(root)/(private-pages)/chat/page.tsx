import AskChatGPT from "@/app/(root)/(private-pages)/chat/components/ask-chat-gpt";
import ChatHistory from "@/app/(root)/(private-pages)/chat/components/chat-history";
import {auth} from "@/lib/auth";

const ChatPage = async () => {
	const session = await auth()
	return (
		<main className="pt-4 h-full w-full
		flex-1 justify-start items-center">
			<div className=" w-2/3 text-center mx-auto">
				<h2 className="text-bold text-3xl">Have some question?</h2>
				<AskChatGPT session={session}/>
				<ChatHistory/>
			</div>
		</main>
	);
};
export default ChatPage