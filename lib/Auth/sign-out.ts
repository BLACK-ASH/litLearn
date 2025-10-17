import { redirect } from "next/navigation";
import { authClient } from "./auth-client";

const signOut = async () => {
await authClient.signOut({
    fetchOptions: {
        onSuccess: () => {
            redirect("/login"); // redirect to login page
        },
    },
});

}

export default signOut