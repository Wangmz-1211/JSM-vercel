'use client';

import {useChat} from 'ai/react';
import ChatCardMessage from "@/app/(root)/(private-pages)/chat/components/chat-card-message";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useEffect, useRef} from "react";

export default function Chat() {
    const bottomRef = useRef(null)
    const {messages, input, handleInputChange, handleSubmit} = useChat();

    useEffect(() => {
        // @ts-ignore
        bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages]);

    return (
        <>
            <ScrollArea className=" mb-4 w-screen overflow-y-scroll"
            >
                <section className="overflow-y-scroll  mb-0">
                    {messages.map(m => (
                        <ChatCardMessage key={m.id} role={m.role} content={m.content}/>
                    ))}
                    <span ref={bottomRef} className="h-[1px] block w-0"></span>
                </section>
            </ScrollArea>

            <form
                className="flex space-x-4 px-12 w-full h-24 mt-auto fixed bottom-0
                pb-24 pt-4 bg-background
                border-t
                            "
                  onSubmit={handleSubmit}>
                <Input
                    className="rounded-md p-2 text-black w-full text-foreground"
                    value={input}
                    onChange={handleInputChange}
                />
                <Button
                    type="submit"
                >
                    Send
                </Button>
            </form>
        </>
    );
}
