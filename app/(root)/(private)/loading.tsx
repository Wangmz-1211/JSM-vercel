import {Loader2} from "lucide-react";

const Loading = () => {
	return (
		<div className="h-full max-w-full bg-red text-center space-x-2">
			<Loader2
				className="inline-block animate-spin text-jred"/><span >Loading...</span>
		</div>
	)
}
export default Loading