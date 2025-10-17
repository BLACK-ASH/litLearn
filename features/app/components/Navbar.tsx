import ThemeToggle from "@/components/theme-toggle";

const Navbar = () => {
  return (
    <header>
      <nav className="flex items-center justify-between px-4 py-2 fixed top-0 left-0 w-full bg-background/75 backdrop-blur border-b-2 z-10">
        <h1 className="font-bold text-pretty text-primary text-xl md:text-2xl">
          LitLearn
        </h1>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
