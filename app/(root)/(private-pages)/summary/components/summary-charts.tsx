import SummaryChartsLine from "@/app/(root)/(private-pages)/summary/components/summary-charts-line";


export const SummaryCharts = (
	{
		records
	}: {
		records: Array<any>
	}
) => {


	return (
		<div className="w-2/3 mx-auto">
			<SummaryChartsLine records={records} level="N2"/>
		</div>
	)
}

export default SummaryCharts