import Image from "next/image";
import trackLight from "../../../../public/track-light.png"
import trackDark from "../../../../public/track-dark.png"
import analyzeLight from "../../../../public/analyze-light.png"
import analyzeDark from "../../../../public/analyze-dark.png"
import askLight from "../../../../public/ask-light.png"
import askDark from "../../../../public/ask-dark.png"
import editLight from "../../../../public/edit-light.png"
import editDark from "../../../../public/edit-dark.png"


export default async function Home() {

	return <div className="w-max mx-auto">
		{/*// @ts-ignore*/}
		<h1 className="text-5xl font-bold text-center mt-32">Track, analyze, improve</h1>
		<h2 className="text-xl font-semibold text-center mt-4 mb-32">Turn your Japanese learning journey into a success story.</h2>

		<h3 className="font-semibold text-2xl text-center">Score Tracking</h3>
		<Image 
			className="dark:hidden"
			src={trackLight}
			alt="Track your progress"
			sizes="100vw"
			style={{width: "100%", height: "auto"}}
		/>
		<Image 
		  className="hidden dark:block"
			src={trackDark}
			alt="Track your progress"
			sizes="100vw"
			style={{width: "100%", height: "auto"}}
		/>	

		<Image 
			className="dark:hidden"
			src={editLight}
			alt="Edit your content"
			sizes="100vw"
			style={{width: "100%", height: "auto"}}
		/>

		<Image 
		  className="hidden dark:block"
			src={editDark}
			alt="Edit your content"
			sizes="100vw"
			style={{width: "100%", height: "auto"}}
		/>

		<h3 className="font-semibold text-2xl text-center">Analysis and Improvement</h3>

		<Image 
			className="dark:hidden"
			src={analyzeLight}
			alt="Analyze your progress"
			sizes="100vw"
			style={{width: "100%", height: "auto"}}
		/>
		<Image 
		  className="hidden dark:block"
			src={analyzeDark}
			alt="Analyze your progress"
			sizes="100vw"
			style={{width: "100%", height: "auto"}}
		/>

		<Image 
			className="dark:hidden"
			src={askLight}
			alt="Ask questions"
			sizes="100vw"
			style={{width: "100%", height: "auto"}}
		/>
		<Image 
		  className="hidden dark:block"
			src={askDark}
			alt="Ask questions"
			sizes="100vw"
			style={{width: "100%", height: "auto"}}
		/>



	</div>
}
