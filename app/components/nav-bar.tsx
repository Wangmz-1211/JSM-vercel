import NavBarItem from '@/app/components/nav-bar-item'

export default function NavBar() {
	return (
		<nav className="flex flex-row space-x-2 justify-center items-center">
			<NavBarItem href='/'>HOME</NavBarItem>
			<NavBarItem href='/summary'>SUMMARY</NavBarItem>
			<NavBarItem href='/score'>SCORE</NavBarItem>
			<NavBarItem href='/chat'>CHAT</NavBarItem>
		</nav>
	)
}
