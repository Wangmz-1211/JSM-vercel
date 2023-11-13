import {
	Dialog,
	DialogContent, DialogDescription, DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog'
import ScoreCreateCard from "@/app/(root)/(private)/score/components/score-create-card";
import ScoreCreateForm from "@/app/(root)/(private)/score/components/score-create-form";



const ScoreCreateDialog = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<ScoreCreateCard/>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-xl font-bold">
						Create a new score record
					</h2>
					<DialogDescription>
						Create a new record here, and then you can find it and edit it in the
						list. It`&apos;s recommended to name the record as `&apos;N2-YYYY-MM`&apos;.
					</DialogDescription>
				</DialogHeader>
				<ScoreCreateForm/>

			</DialogContent>
		</Dialog>

	)
}
export default ScoreCreateDialog