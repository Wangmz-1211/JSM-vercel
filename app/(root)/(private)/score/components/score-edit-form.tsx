'use client'

import {zodResolver} from "@hookform/resolvers/zod";
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
	SheetFooter,
	SheetClose
} from "@/components/ui/sheet";
import {ChevronDown} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {Dispatch, useState} from "react";
import ScoreDelete from "@/app/(root)/(private)/score/components/score-delete";


const formSchema = z.object({
	v1: z.number().int().gte(0).lte(5),
	v2: z.number().int().gte(0).lte(5),
	v3: z.number().int().gte(0).lte(5),
	v4: z.number().int().gte(0).lte(7),
	v5: z.number().int().gte(0).lte(5),
	v6: z.number().int().gte(0).lte(5),
	g7: z.number().int().gte(0).lte(12),
	g8: z.number().int().gte(0).lte(5),
	g9: z.number().int().gte(0).lte(5),
	r10: z.number().int().gte(0).lte(5),
	r11_1: z.number().int().gte(0).lte(6),
	r11_2: z.number().int().gte(0).lte(3),
	r12: z.number().int().gte(0).lte(2),
	r13: z.number().int().gte(0).lte(3),
	r14: z.number().int().gte(0).lte(2),
	l1: z.number().int().gte(0).lte(5),
	l2: z.number().int().gte(0).lte(6),
	l3: z.number().int().gte(0).lte(5),
	l4: z.number().int().gte(0).lte(12),
	l5: z.number().int().gte(0).lte(4),
})

type fieldNamesType =
	"v1"
	| "v2"
	| "v3"
	| "v4"
	| "v5"
	| "v6"
	| "g7"
	| "g8"
	| "g9"
	| "r10"
	| "r11_1"
	| "r11_2"
	| "r12"
	| "r13"
	| "r14"
	| "l1"
	| "l2"
	| "l3"
	| "l4"
	| "l5"

const mapper = (fieldName: string, form: any) => {
	let displayedFieldName: string;
	switch (fieldName.charAt(0)) {
		case 'v':
			displayedFieldName = fieldName.replace('v', 'Vocabulary - ')
			break;
		case 'g':
			displayedFieldName = fieldName.replace('g', 'Grammar - ')
			break;
		case 'r':
			displayedFieldName = fieldName.replace('r', 'Reading - ')
			displayedFieldName = displayedFieldName.replace('_1', '(1)')
			displayedFieldName = displayedFieldName.replace('_2', '(2)')
			break;
		case 'l':
			displayedFieldName = fieldName.replace('l', 'Listening - ')
			break
	}

	return (
		<FormField
			key={fieldName}
			control={form.control}
			name={fieldName!}
			render={({field}) => {
				return (
					<FormItem className='w64 px-4 mx-2 ' key={displayedFieldName}>
						<FormLabel>{displayedFieldName}</FormLabel>
						<FormControl>
							<Input
								{...field}
								type='number'
								onChange={
									e => field.onChange(+e.target.value)
								}
							/>
						</FormControl>
						<FormMessage/>
					</FormItem>
				)
			}}
		/>
	)
}

const groupNames: Array<string> = [
	'vocabulary', 'grammar', 'reading', 'listening'
]

const vocabularyFields: Array<fieldNamesType> = [
	'v1', 'v2', 'v3', 'v4', 'v5', 'v6'
]

const grammarFields: Array<fieldNamesType> = [
	'g7', 'g8', 'g9',
]

const readingFields: Array<fieldNamesType> = [
	'r10', 'r11_1', 'r11_2', 'r12', 'r13', 'r14',
]

const listeningFields: Array<fieldNamesType> = [
	'l1', 'l2', 'l3', 'l4', 'l5'
]

const groupsToFieldsMapping: Record<string, Array<fieldNamesType>> = {
	vocabulary: vocabularyFields,
	grammar: grammarFields,
	reading: readingFields,
	listening: listeningFields,
}

const updateRecordDisplay = (record: Record<string, any>, newRecord: Record<string, any>) => {
	console.log(record, newRecord)
	record.total_score = newRecord.total_score
	record.vocabulary = newRecord.vocabulary
	record.vocabulary_score = newRecord.vocabulary_score
	record.grammar = newRecord.grammar
	record.grammar__score = newRecord.grammar_score
	record.reading = newRecord.reading
	record.reading_score = newRecord.reading_score
	record.listening = newRecord.listening
	record.listening_score = newRecord.listening_score
}
export default function ScoreEditForm(
	{
		record,
		setRecord,
		setOpen
	}:
		{
			record: Record<string, any>,
			setRecord: Dispatch<any>,
			setOpen: Dispatch<any>
		}) {
	const {toast} = useToast()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			v1: record.vocabulary.v1,
			v2: record.vocabulary.v2,
			v3: record.vocabulary.v3,
			v4: record.vocabulary.v4,
			v5: record.vocabulary.v5,
			v6: record.vocabulary.v6,
			g7: record.grammar.g7,
			g8: record.grammar.g8,
			g9: record.grammar.g9,
			r10: record.reading.r10,
			r11_1: record.reading.r11_1,
			r11_2: record.reading.r11_2,
			r12: record.reading.r12,
			r13: record.reading.r13,
			r14: record.reading.r14,
			l1: record.listening.l1,
			l2: record.listening.l2,
			l3: record.listening.l3,
			l4: record.listening.l4,
			l5: record.listening.l5,
		}
	})



	async function onSubmit(values: z.infer<typeof formSchema>) {
		const response = await fetch('/api/score/update', {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...values,
				user_email: record.user_email,
				id: record.id
			})
		})

		if (response.ok) {
			const newRecord = await response.json()
			setRecord(newRecord)
			toast({
				title: 'Updated!',
				description: 'you score has been updated.'
			})
			setOpen(false)
		} else {
			const text = await response.text()
			toast({
				title: 'Something error!',
				description: text
			})
		}

	}


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<ScrollArea className='w-full h-[80vh] flex flex-row'>

					{groupNames.map(groupName => {
						const fieldNames = groupsToFieldsMapping[groupName]
						return (
							<Collapsible key={groupName} className="w-full ">
								<CollapsibleTrigger className="w-full">
									<div className="w-full h-12 border-b text-start leading-[3] font-bold">
										<ChevronDown className="inline-block mr-2"/>{groupName.toUpperCase()}
									</div>
								</CollapsibleTrigger>
								<CollapsibleContent className="border-l pb-2">
									{fieldNames.map((fieldName) => mapper(fieldName, form))}
								</CollapsibleContent>
							</Collapsible>
						)
					})}

				</ScrollArea>
				<Button type="submit" className='float-right w-20'>Edit</Button>
				<ScoreDelete id={record.id}/>

			</form>
		</Form>
	)
}