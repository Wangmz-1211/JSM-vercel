'use client'
import ChatCardMessage from "@/app/(root)/(private-pages)/chat/components/chat-card-message";
import {useEffect} from "react";
import {useChat} from "ai/react";

const cleanRecord = (record: Record<string, any>) => {
	delete record.vocabulary
	delete record.grammar
	delete record.listening
	delete record.id
	delete record.reading
	delete record.v
	delete record.user_email
	return record
}
export const SummaryAnalysis = (
		{
			records
		}: {
			records: Array<any>
		}
	) => {
		const {messages, append} = useChat({
			api: '/api/chat/analysis',

		})
		const cleanedRecords = records.map(record => cleanRecord(record))

		useEffect(() => {
				console.log(messages)
				append({
						role: 'user',
						content: JSON.stringify(cleanedRecords)
					}
				)
				console.log(messages)
			}, []
		)
		;

		return (

			<div className="w-screen">
				<section className="overflow-y-scroll mt-4">
					{messages.map(m => {
							if (m.role === 'user') return null
							return (
								<ChatCardMessage key={m.id} role={m.role} content={m.content}/>
							)
						}
					)}
				</section>
				{/*<form*/}
				{/*	ref={formRef}*/}
				{/*	className="flex space-x-4 px-12 w-full*/}
				{/*          pb-24 pt-4 bg-background*/}
				{/*          border-t*/}
				{/*                      "*/}
				{/*	onSubmit={handleHandleSubmit}>*/}
				{/*	<Button type="submit">Analysis</Button>*/}
				{/*</form>*/}
			</div>
		)
			;
	}
;

export default SummaryAnalysis