import { Separator } from "@/components/ui/separator";
import Features from "@/features/app/components/Features";
import Hero from "@/features/app/components/Hero";
import Testimonials from "@/features/app/components/Testimonials";

export default function Home() {
  return (
    <div className="container mx-auto scroll-mt-28 p-2">
      <Hero />
      <Separator className="bg-primary my-12 h-[2px] max-w-2/3 mx-auto" />
      <Features />
      <Separator className="bg-primary my-12 h-[2px] max-w-2/3 mx-auto" />
      <Testimonials />
    </div>
  );
}
