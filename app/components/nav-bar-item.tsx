'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const NavBarItem = ({
	                    children,
	                    href,
                    }: {
	children: any
	href: string
}) => {
	const pathname = usePathname()
	return (
		<Link
			className={"inline-block border-box h-8 w-20 text-center text-[0.75rem] hover:text-jred"
				+ (pathname === href ? " font-bold border-b-2 border-jred": "")}
			href={href}>
			{children}
		</Link>
	)
}

export default NavBarItem
