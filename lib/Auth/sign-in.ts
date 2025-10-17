
import { redirect } from "next/navigation";
import { authClient } from "./auth-client"

const emailAndPasswordSignIn = async (email: string, password: string) => {

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
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed. 
         * @default true
        */
        rememberMe: false
    }, {
        //callbacks
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            
            redirect("/")
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
    })
}



export { emailAndPasswordSignIn }