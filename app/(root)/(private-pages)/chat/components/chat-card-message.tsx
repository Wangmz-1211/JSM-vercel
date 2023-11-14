import {BotIcon, User2} from "lucide-react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import {auth} from "@/lib/auth";

export const ChatCardMessage =  (
    {
        role,
        content,

    }: {
        role: string,
        content: string
    }
) => {
    if (role === 'system') return null
    return (
        <div className={'text-start flex flex-col gap-0 px-12 py-2' + (role !== 'user' ? ' bg-neutral-200 dark:bg-neutral-800': "")}>
            <div className='text-xl font-bold leading-7 relative block h-8'>
                {role === 'assistant' ?
                    <BotIcon className="inline-block mr-1 h-6 w-6 top-0.5 left-1 absolute"/>
                    :
                    <User2 className="inline-block mr-1 h-6 w-6 top-0.5 left-1 absolute"/>
                }
                <span className="absolute left-8 text-md">{role === 'assistant' ? "先生": role}</span>
            </div>
            <ReactMarkdown
                className="block pl-4 space-y-2"
                remarkPlugins={[remarkGfm]}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
export default ChatCardMessage