import SignInForm from "@/app/(root)/(authentication)/sign-in/components/sign-in-form";
import RedirectToHome from "@/app/(root)/(authentication)/components/redirect-to-home";


const Login = () => {
	return (
		<>
			<h2 className="h-16 text-2xl text-center block leading-[4rem] font-light">Sign in to JSM</h2>
			<SignInForm/>
			<RedirectToHome/>
		</>
	)
}
export default Login
