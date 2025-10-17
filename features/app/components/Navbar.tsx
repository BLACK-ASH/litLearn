"use client";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/Auth/auth-client";
import signOut from "@/lib/Auth/sign-out";

const Navbar = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  return (
    <header>
      <nav className="flex items-center justify-between px-4 py-2 fixed top-0 left-0 w-full bg-background/75 backdrop-blur border-b-2 z-10">
        <h1 className="font-bold text-pretty text-primary text-xl md:text-2xl">
          LitLearn
        </h1>
        <div className="flex items-center">
          {session && <p className="mr-4">{session.user.name}</p>}
          {session && <Button onClick={async()=>await signOut()}>Logout</Button>}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
