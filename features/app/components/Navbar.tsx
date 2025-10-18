"use client";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/Auth/auth-client";
import Link from "next/link";
import { id } from "zod/v4/locales";

const links = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Blogs",
    href: "/blogs",
  },
  {
    id: 3,
    title: "Resources",
    href: "/resources",
  },
];

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
        <ul className="flex items-center">
          {links.map((link) => (
            <Button variant={"link"} key={link.id} className="mr-4" asChild>
              <Link href={link.href}>{link.title}</Link>
            </Button>
          ))}
        </ul>
        <div className="flex items-center">
          {session && <p className="mr-4">{session.user.name}</p>}
          {session ? (
            <Button onClick={() => authClient.signOut()}>Logout</Button>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
