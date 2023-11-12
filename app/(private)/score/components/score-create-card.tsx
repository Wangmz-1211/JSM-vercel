import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Plus} from "lucide-react";

const ScoreCreateCard = () => {
	return (
		<Card
			className="w-64 h-28 relative box-border overflow-clip text-foreground
		shadow-secondary shadow-md hover:scale-110 hover:z-10 duration-200 hover:shadow-2xl">
			<CardHeader>
				<CardTitle
					className="absolute left-6">
					Create a record
				</CardTitle>
				<CardContent>
					<Plus
						className="w-8 h-8 absolute right-1/2 bottom-5 translate-x-1/2"/>
				</CardContent>
			</CardHeader>
		</Card>
	)
}
export default ScoreCreateCard