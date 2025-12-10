import ScoreCard from "@/app/(root)/(private-pages)/score/components/score-card";
import prisma from "@/app/(root)/api/lib/PrismaClient";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import ScoreCreateDialog from "@/app/(root)/(private-pages)/score/components/score-create-dialog";
import { scores } from "@prisma/client";

const ScoreList = async () => {

	const session = await auth()
	if (!session) redirect('/sign-in')

	const scores = await prisma.scores.findMany({
		where: {
			user_email: session!.user!.email!.toLowerCase()
		}
	})

	const sortedScores = scores.sort((a: scores, b: scores) => {
		const aTitle = a.title.split('-');
		const bTitle = b.title.split('-');
		if (aTitle[0] === bTitle[0]) {
			if (aTitle[1] === bTitle[1]) {
				const aMonth = parseInt(aTitle[2], 10),
					bMonth = parseInt(bTitle[2], 10)
				return aMonth - bMonth;
			} else {
				const aYear = parseInt(aTitle[1], 10),
					bYear = parseInt(bTitle[1], 10)
				return aYear - bYear;
			}
		} else {
			const aLevel = parseInt(aTitle[0].replace('N', ''), 10)
			const bLevel = parseInt(bTitle[0].replace('N', ''), 10)
			return aLevel - bLevel;
		}
	})

	return (
		<div className=" w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-y-4 mt-4">
			{sortedScores.map((score) => {
					return <ScoreCard key={score.id} score={score}/>
				}
			)}
			<ScoreCreateDialog/>
		</div>

	)
}
export default ScoreList