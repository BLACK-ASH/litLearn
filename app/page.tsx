import ThemeToggle from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import Features from "@/features/app/components/Features";
import Hero from "@/features/app/components/Hero";
import Testimonials from "@/features/app/components/Testimonials";

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-between px-4 py-2">
        <h1 className="font-bold text-pretty text-primary md:text-2xl">
          LitLearn
        </h1>
        <ThemeToggle />
      </nav>
      <Hero />
      <Separator className="bg-primary my-12 h-[2px] max-w-2/3 mx-auto" />
      <Features />
      <Separator className="bg-primary my-12 h-[2px] max-w-2/3 mx-auto" />
      <Testimonials />
      <footer className="flex items-center mt-12 justify-between px-4 py-2 border-t-2">
        <p className="font-bold text-pretty text-primary md:text-2xl">
          LitLearn
        </p>
        <ThemeToggle />
      </footer>
    </div>
  );
}
