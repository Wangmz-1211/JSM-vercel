import {Progress} from "@/components/ui/progress";

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