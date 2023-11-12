import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import prisma from "@/app/api/lib/PrismaClient";
import SummaryChartsLine from "@/app/(private)/summary/components/summary-charts-line";


export const SummaryCharts = async () => {
	const session = await auth()
	if (!session) redirect('/sign-in')
	const records = await prisma.scores.findMany({
		where: {
			user_email: session!.user!.email!.toLowerCase()
		}
	})
	const sortedRecords = records.sort((a, b) => {
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
		<div className="w-full">
			<SummaryChartsLine records={sortedRecords} level="N2"/>
		</div>
	)
}

export default SummaryCharts