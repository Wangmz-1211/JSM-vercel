import CredentialsForm from "@/app/(root)/(authentication)/sign-in/components/credentials-form";
import OAuthSignIn from "@/app/(root)/(authentication)/sign-in/components/oauth-sign-in";

const SignInForm = () => {

	return (
		<div className="mx-auto w-4/5 md:w-1/2 lg:w-2/5 space-y-3 p-3 rounded-2xl box-border border">
			<CredentialsForm/>
			<OAuthSignIn/>
		</div>
	)
}
export default  SignInForm