import Image from "next/image";
import trackImg from "../../../../public/track.png"

export default async function Home() {

	return <div className="w-max mx-auto mt-12">
		{/*// @ts-ignore*/}
		<h1 className="text-5xl font-bold text-center">Track, analyze, improve</h1>
		<h2 className="text-xl font-semibold text-center mt-4">Turn your Japanese learning journey into a success story.</h2>
		<Image 
			src={trackImg} 
			alt="Picture of score tracking" 
			sizes="100vw"
			style={{
				width: '100%',
				height: 'auto',
			}}
		/>
	</div>
}
