import SummaryCharts from "@/app/(root)/(private-pages)/summary/components/summary-charts";

const Summary = () => {
    return (
        <div className="w-max h-full flex-1 pt-4 mx-auto">
            <SummaryCharts/>
            <span className="text-center mx-auto w-full inline-block mt-4 text-jred">✨ Coming feature: analysis the trend by AI</span>
        </div>
    )
}
export default Summary
