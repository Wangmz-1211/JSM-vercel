import ChatCard from "@/app/(root)/(private-pages)/chat/components/chat-card";

export const ChatList = async () => {

	const chatsList = await fetch(`${process.env.NEXTAUTH_URL}/api/chat/list`, {
		method: 'GET'
	}).then(res => res.json())

	return (
		<div className="space-y-2">
			{
				chatsList.map((chats: {
					id: string,
					user_email: string,
					messages: Array<{ role: string, content: string }>
				}) => {
					return <ChatCard chats={chats} key={chats.id}></ChatCard>
				})
			}
		</div>
	);
};

export default ChatList