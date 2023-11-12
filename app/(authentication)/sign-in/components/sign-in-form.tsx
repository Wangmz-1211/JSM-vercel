import CredentialsForm from "@/app/(authentication)/sign-in/components/credentials-form";
import OAuthSignIn from "@/app/(authentication)/sign-in/components/oauth-sign-in";

const SignInForm = () => {

	return (
		<div className="mx-auto w-1/2 md:w-1/3 lg:w-2/5 space-y-3 p-3 rounded-2xl box-border border">
			<CredentialsForm/>
			<OAuthSignIn/>
		</div>
	)
}
export default  SignInForm