"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialsProps {
  id: number;
  name: string;
  message: string;
}

const dummyTestimonials: TestimonialsProps[] = [
  {
    id: 1,
    name: "John Doe",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    name: "Jane Doe",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 3,
    name: "John Doe",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 4,
    name: "Jane Doe",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

const Testimonials = () => {
  useGSAP(() => {
    gsap.from(".testimonial-title", {
      duration: 0.5,
      delay: 2.5,
      opacity: 0,
      y: 20,
    });

    gsap.registerPlugin(ScrollTrigger);

    const testimonialTimeline = gsap.timeline();

    const testimonialCards = gsap.utils.toArray<HTMLDivElement>(".testimonial-card");
 
    testimonialTimeline.from(testimonialCards, {
      scrollTrigger: {
        trigger:testimonialCards[0],
        start: "top bottom",
        scrub: true,
      },
      duration: 2,
      opacity: 0,
      delay: 0.5,
      y: 100,
      stagger: 0.2,
    });

    return () => {
      gsap.killTweensOf(".testimonial-title");
      testimonialTimeline.kill();
    };
  }, []);

  return (
    <section id="testimonials" className="w-full box-border scroll-mt-28 p-2">
      <h2 className="testimonial-title scroll-m-20 text-center my-4 pb-2 text-3xl md:text-5xl font-semibold tracking-tight first:mt-0">
       What Our Users Say
      </h2>
       <h4 className="scroll-m-20 text-center my-4 pb-2 md:text-xl font-semibold tracking-tight first:mt-0">
       Hear from students, teachers, and aspirants who’ve benefited from our resources.
      </h4>
      <div className="flex flex-col gap-2">
        {dummyTestimonials.map((testimonial: TestimonialsProps, i) => (
          <Card
            key={testimonial.id}
            className={cn(
              "w-3/4 sm:w-1/3 shadow-md shadow-primary/20 dark:shadow-primary/50 testimonial-card",
              i % 2 === 0 ? "self-start" : "self-end",
            )}
          >
            <CardHeader>
              <Quote className="text-primary" />
            </CardHeader>
            <CardContent>
              <p className="">{testimonial.message}</p>
            </CardContent>
            <Separator />
            <CardFooter>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="ml-2">{testimonial.name}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
