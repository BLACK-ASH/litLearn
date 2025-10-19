"use client";

import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/Auth/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Blogs", href: "/blogs" },
  { id: 3, title: "Resources", href: "/resources" },
  { id: 4, title: "Create Blog", href: "/create-blog" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  return (
    <header className="fixed top-0 left-0 w-full bg-background/70 backdrop-blur border-b z-10">
      <nav className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Brand */}
        <h1 className="font-bold text-primary text-xl md:text-2xl">LitLearn</h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <Button
              key={link.id}
              variant="link"
              asChild
              className={`text-base transition-colors ${
                pathname === link.href
                  ? "text-primary font-semibold underline underline-offset-4"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Link href={link.href}>{link.title}</Link>
            </Button>
          ))}
        </ul>

        {/* Auth + Theme */}
        <div className="hidden md:flex items-center gap-2">
          {session && <p className="mr-2 text-sm text-muted-foreground">{session.user.name}</p>}
          {session ? (
            <Button size="sm" onClick={() => authClient.signOut()}>
              Logout
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <Button
        variant={"ghost"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg hover:bg-accent"
        >
          <Menu className="size-4" />
        </Button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start bg-background/90 backdrop-blur px-6 pb-4 border-t animate-in fade-in slide-in-from-top-2">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`py-2 text-base w-full ${
                pathname === link.href
                  ? "text-primary font-semibold underline underline-offset-4"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.title}
            </Link>
          ))}

          <div className="mt-3 flex flex-col gap-2 w-full">
            {session && (
              <p className="text-sm text-muted-foreground">{session.user.name}</p>
            )}
            {session ? (
              <Button
                className="w-full"
                onClick={() => {
                  setMenuOpen(false);
                  authClient.signOut();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
