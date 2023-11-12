const AuthLayout = ({children}: { children: React.ReactNode }) => {
	return (
		<main className="h-full w-full flex flex-col items-center">
			{children}
		</main>
	)
}
export default AuthLayout