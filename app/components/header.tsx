import NavBar from "@/app/components/nav-bar";
import ModeToggleBtn from "@/app/components/mode-toggle-btn";
import UserAuth from '@/app/components/user-auth'

const Header = () => {
	return (
		<header className='w-screen border-b border-secondary shadow-md'>
			<div className='h-16 p-4 relative'>
				<h1
					className='h-8 text-center font-semibold md:text-2xl
					 absolute left-1/2 -translate-x-1/2
					hidden md:inline-block'>
					JLPT SCORE MANAGER
				</h1>
				<div
					className="float-left"
				>
					<ModeToggleBtn/>
				</div>
				<div
					className="float-right"
				>
					<UserAuth/>
				</div>
			</div>
			<NavBar></NavBar>
		</header>
	)

}
export default Header