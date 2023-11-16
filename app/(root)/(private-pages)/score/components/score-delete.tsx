'use client'

import {Button} from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {useState} from "react";
import {Loader2} from "lucide-react";

const ScoreDelete = ({id}: { id: string }) => {
	const [open, setOpen] = useState(false),
		[isLoading, setIsLoading] = useState(false)


	async function onDelete(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault()
		setIsLoading(true)
		await fetch('/api/score/delete', {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				id
			})
		})
		setIsLoading(false)
		document.location.reload()
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger>
				<Button
					className="bg-jred float-right w-20 mr-2"
					onClick={(e) => {
						e.preventDefault()
						setOpen(true)
					}}
				>
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your score record
						and remove the data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={isLoading}
						className="bg-jred relative"
						onClick={onDelete}>
						DELETE
						{isLoading && <Loader2 className='animate-spin absolute bottom-2 text-secondary'/>}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)

}
export default ScoreDelete