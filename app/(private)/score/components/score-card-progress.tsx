import {Progress} from "@/components/ui/progress";
import {red} from "next/dist/lib/picocolors";

const ScoreCardProgress = ({progress}: { progress: number }) => {
	return (
		<Progress
			value={progress}
			className="w-full h-1.5
				absolute bottom-0 left-0
				rounded-t-none rounded-b-none"
		/>
	)
}
export default ScoreCardProgress