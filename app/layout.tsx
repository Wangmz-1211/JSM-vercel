import type {Metadata} from 'next'
import './globals.css'
import {ThemeProvider} from "@/app/context/theme-provider";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import {Toaster} from "@/components/ui/toaster";
import ClientSessionProvider from "@/app/context/client-provider";
import {auth} from "@/lib/auth";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
	title: 'JLPT Score Manager',
	description: 'Manage you JLPT score records and track the trend.',
}

export default async function RootLayout({
	                                         children,
                                         }: {
	children: React.ReactNode
}) {
	const session = await auth()
	return (
		<html
			lang='en'
			className='min-h-screen text-foreground bg-background'
			suppressHydrationWarning
		>
		<body className='flex flex-col justify-between items-center w-screen min-h-screen gap-0'>
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			// disableTransitionOnChange
		>
			<ClientSessionProvider session={session}>
				<Header/>

				<main className='flex-grow w-full mt-24'>
					{children}
					<Toaster/>

				</main>

				<Footer/>


			</ClientSessionProvider>

		</ThemeProvider>
		<Analytics />
		</body>
		</html>
	)
}
