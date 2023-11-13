const ScoreCardScoreDisplay = ({ totalScore}: {totalScore: number}) => {
	return (
		<div className="w-28 h-12 absolute right-0 bottom-1.5
		text-center leading-[3]">
			<span className="text-3xl font-bold">{totalScore}</span>
			<span className="text-xl text-neutral-600">/180</span>
		</div>
	)
}
export default ScoreCardScoreDisplay