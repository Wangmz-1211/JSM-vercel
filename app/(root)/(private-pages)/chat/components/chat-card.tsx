import {Card} from "@/components/ui/card";
import ChatCardMessage from "@/app/(root)/(private-pages)/chat/components/chat-card-message";

export const ChatCard = (
	{
		chats
	}: {
		chats: {
			user_email: string,
			messages: Array<{ role: string, content: string }>
		} & any
	}
) => {
	return (
		<Card className="space-y-2 py-4">
			{chats.messages.map((message: { role: string, content: string }, index: number) => (
				<ChatCardMessage message={message} key={index}/>
			))}
		</Card>
	);
};
export default ChatCard
