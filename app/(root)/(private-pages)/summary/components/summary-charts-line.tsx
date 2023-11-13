'use client'

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {useMemo} from "react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: false,
			text: 'Trend of Score',
		},
	},
}
const SummaryChartsLine = (
	{
		records,
		level
	}: {
		records: Record<string, any>,
		level: "N1" | "N2"
	}) => {

	const data = useMemo(() => {
		const filteredRecords = records.filter((record: Record<string, any>) => {
			const N1pattern = /N1-20[1-2][0-9]-(07|12)/
			const N2pattern = /N2-20[1-2][0-9]-(07|12)/
			return (
				record.title &&
				(level === 'N2' ? N2pattern : N1pattern).test(
					record.title.trim()
				)
			)
		})
		return {
			labels: filteredRecords.map((record: Record<string, any>) => record.title),
			datasets: [
				{
					label: 'Total Score',
					data: filteredRecords.map((record: Record<string, any>) => record.total_score),
					borderColor: 'rgb(236,91,86)',
					backgroundColor: 'rgba(236,91,86,0.5)',
				},
				{
					label: 'Knowledge',
					data: filteredRecords.map((record: Record<string, any>) => {
						return (
							// parseInt(record.vocabulary_score, 10) +
							// parseInt(record.grammar_score, 10)
							record.vocabulary_score + record.grammar_score
						).toString()
					}),
					borderColor: 'rgb(56,117,246)',
					backgroundColor: 'rgba(56,117,246,0.5)',
				},
				{
					label: 'Reading',
					data: filteredRecords.map((record: Record<string, any>) => record.reading_score),
					borderColor: 'rgb(239,176,65)',
					backgroundColor: 'rgba(239,176,65,0.5)',
				},
				{
					label: 'Listening',
					data: filteredRecords.map((record: Record<string, any>) => record.listening_score),
					borderColor: 'rgb(114,193,64)',
					backgroundColor: 'rgba(114,193,64,0.5)',
				},
			],
		}
	}, [records, level])
	return (
		<Line
			data={data}
			// @ts-ignore
			options={options}
			style={{
				width: '80vw',
			}}/>
	)

}
export default SummaryChartsLine