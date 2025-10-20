
import { type useRouter } from "next/navigation";
import { authClient } from "./auth-client"
import { toast } from "sonner";

const emailAndPasswordSignIn = async (email: string, password: string, router: ReturnType<typeof useRouter>) => {

    await authClient.signIn.email({
        /**
         * The user email
        */
        email,
        /**
         * The user password
        */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
        */
        callbackURL: "/",
        /**
         * remember the user session after the browser is closed. 
         * @default true
        */
        rememberMe: false
    }, {
        //callbacks
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            
            toast.success("Login successful")
            router.push("/")
        },
        onError: (ctx) => {
            // display the error message
            toast.error(ctx.error.message);
        },
    })

}



export { emailAndPasswordSignIn }