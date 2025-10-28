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
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { useRef } from "react";

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
    message: "Doloribus numquam incidunt, itaque velit consequatur nisi.",
  },
  {
    id: 3,
    name: "Michael Scott",
    message: "That’s what she said! Best experience ever.",
  },
  {
    id: 4,
    name: "Pam Beesly",
    message: "Highly recommend it! Loved the UI and resources.",
  },
];

const Testimonials = () => {
  const marqueeLeftRef = useRef<HTMLDivElement>(null);
  const marqueeRightRef = useRef<HTMLDivElement>(null);

  const leftTimeline = useRef<GSAPTimeline | null>(null);
  const rightTimeline = useRef<GSAPTimeline | null>(null);

  useGSAP(() => {
    // Left Row - moves to the left
    if (marqueeLeftRef.current) {
      leftTimeline.current = gsap
        .timeline({ repeat: -1, defaults: { ease: "none" } })
        .fromTo(
          marqueeLeftRef.current,
          { xPercent: 0 },
          { xPercent: -50, duration: 20 },
        );
    }

    // Right Row - moves to the right
    if (marqueeRightRef.current) {
      rightTimeline.current = gsap
        .timeline({ repeat: -1, defaults: { ease: "none" } })
        .fromTo(
          marqueeRightRef.current,
          { xPercent: -50 },
          { xPercent: 0, duration: 20 },
        );
    }

    return () => {
      leftTimeline.current?.kill();
      rightTimeline.current?.kill();
    };
  }, []);

  // Pause on hover
  const handleEnter = (timeline: GSAPTimeline | undefined) => {
    timeline && gsap.to(timeline, { timeScale: 0.25, duration: 0.3 });
  };

  const handleLeave = (timeline: GSAPTimeline | undefined) => {
    timeline && gsap.to(timeline, { timeScale: 1, duration: 0.3 });
  };

  return (
    <section id="testimonials" className="w-full overflow-hidden py-8 px-4">
      <h2 className="testimonial-title text-center mb-4 text-3xl md:text-5xl font-semibold tracking-tight">
        What Our Users Say
      </h2>
      <h4 className="text-center mb-8 text-lg md:text-xl font-medium text-muted-foreground">
        Hear from students, teachers, and aspirants who’ve benefited from our
        resources.
      </h4>

      <div className="w-full md:w-3/4 lg:w-2/3 mx-auto space-y-6">
        {/* Left-moving marquee */}
        {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => handleEnter(leftTimeline?.current ?? undefined)}
          onMouseLeave={() => handleLeave(leftTimeline?.current ?? undefined)}
        >
          <div ref={marqueeLeftRef} className="flex gap-4 w-max">
            {[...dummyTestimonials, ...dummyTestimonials].map(
              (testimonial, i) => (
                <Card
                  key={`left-${testimonial.id}-${i}`}
                  className={cn(
                    "p-4 w-[300px] sm:w-[350px] shadow-md shadow-primary/20 dark:shadow-primary/50 flex-shrink-0",
                  )}
                >
                  <CardHeader>
                    <Quote className="text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p>{testimonial.message}</p>
                  </CardContent>
                  <Separator />
                  <CardFooter>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="ml-2">{testimonial.name}</p>
                  </CardFooter>
                </Card>
              ),
            )}
          </div>
        </div>

        {/* Right-moving marquee */}
        {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => handleEnter(rightTimeline?.current ?? undefined)}
          onMouseLeave={() => handleLeave(rightTimeline?.current ?? undefined)}
        >
          <div ref={marqueeRightRef} className="flex gap-4 w-max">
            {[...dummyTestimonials, ...dummyTestimonials].map(
              (testimonial, i) => (
                <Card
                  key={`right-${testimonial.id}-${i}`}
                  className={cn(
                    "p-4 w-[300px] sm:w-[350px] shadow-md shadow-primary/20 dark:shadow-primary/50 flex-shrink-0",
                  )}
                >
                  <CardHeader>
                    <Quote className="text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p>{testimonial.message}</p>
                  </CardContent>
                  <Separator />
                  <CardFooter>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="ml-2">{testimonial.name}</p>
                  </CardFooter>
                </Card>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
