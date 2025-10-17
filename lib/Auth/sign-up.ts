//import the auth client

import { redirect } from "next/navigation";
import { authClient } from "./auth-client";

const emailAndPasswordSignUp = async (email: string, password: string, name: string) => {

    await authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            redirect("/")
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
    });


}

const signUpWithGoogle = async () => {
    const data = await authClient.signIn.social({
        provider: "google",
    });
    console.log(data);
    
}

export { emailAndPasswordSignUp , signUpWithGoogle };