"use client"

import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button";
import {Moon, Sun} from 'lucide-react'


const ModeToggleBtn = () => {
	const {theme, systemTheme, setTheme} = useTheme()
	const toggleTheme = () => {
		console.log(theme, systemTheme)
		if ((theme === "system" && systemTheme === "light") || theme === "light") setTheme("dark")
		else setTheme("light")
	}
	return (
		<Button onClick={() => toggleTheme()}
		        className="relative w-8 h-8 bg-background text-foreground
		         border border-secondary hover:bg-secondary
		        ">
			<Sun className="absolute dark:scale-0 "/>
			<Moon className="absolute scale-0 dark:scale-100 "/>
		</Button>
	)

}
export default ModeToggleBtn