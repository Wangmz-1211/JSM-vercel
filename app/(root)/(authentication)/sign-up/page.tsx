import SignUpForm from "./components/sign-up-form";
import RedirectToHome from "@/app/(root)/(authentication)/components/redirect-to-home";

const Register = async () => {
	return (
		<>
			<h2 className="h-16 text-2xl text-center block leading-[4rem] font-light">Sign up to JSM</h2>
			<SignUpForm/>
			<RedirectToHome/>
		</>
	)
}
export default Register
