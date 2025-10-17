"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);

      const splitText = new SplitText(titleRef.current, {
        type: "chars,words",
        wordsClass: "char",
      });

      const titleTimeline = gsap.timeline();

      titleTimeline
        .from(splitText.chars, {
          duration: 0.5,
          opacity: 0,
          y: 20,
          stagger: 0.025,
          onComplete: () => {
            splitText.revert();
          },
        })
        .from(subTitleRef.current, { duration: 0.5, opacity: 0, y: 20 })
        .from(ctaRef.current, { duration: 0.5, opacity: 0, y: 20 });

      return () => {
        titleTimeline.kill();
      };
    },
    {
      dependencies: [titleRef],
    },
  );

  return (
    <section
      id="hero"
      className="my-12 md:my-20 md:w-2/3 md:mx-auto w-full p-2 box-border"
    >
      <h1
        ref={titleRef}
        className="scroll-m-20 text-center text-3xl md:text-5xl xl:text-7xl text-primary uppercase font-extrabold tracking-tight text-balance"
      >
        Explore the World of English Literature.
      </h1>
      <h3
        ref={subTitleRef}
        className="scroll-m-20 text-center my-4 pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0"
      >
        Dive into lessons, blogs, and tests curated just for you.
      </h3>

      <div ref={ctaRef} className="flex gap-2 w-fit mx-auto">
        <Button variant="default" size="lg" className="font-bold" asChild>
          <Link href={"/login"}>Get Started</Link>
        </Button>
        <Button variant="outline" size="lg" className="font-bold">
          Explore Blogs
        </Button>
      </div>
    </section>
  );
};

export default Hero;
