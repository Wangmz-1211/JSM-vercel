import {Loader2} from "lucide-react";

const Loading = () => {
	return (
		<div className="h-full w-full bg-red text-center space-x-2 mx-auto absolute top-1/3">
			<Loader2
				className="inline-block animate-spin text-jred"/><span >Loading...</span>
		</div>
	)
}
export default Loading