"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Book, Download, type LucideProps, SquarePen } from "lucide-react";
import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  useRef,
} from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const featuresList: Feature[] = [
  {
    id: 1,
    title: "Organized Resources",
    description:
      "Access PYQs, solved papers, and handwritten notes categorized by year, topic, and difficulty.",
    icon: Book,
  },
  {
    id: 2,
    title: "Interactive Blogs",
    description:
      "Explore tips, strategies, and insights to excel in your exams and understand key concepts.",
    icon: SquarePen,
  },
  {
    id: 3,
    title: "Downloadable Content",
    description:
      "Download notes and papers in PDF format for offline access anytime, anywhere.",
    icon: Download,
  },
];

const Features = () => {
  const featuresRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!featuresRef.current) return null;
    const featuresElement = gsap.utils.toArray<HTMLElement>(
      featuresRef.current?.children,
    );

    const featuresTimeline = gsap.timeline();

    featuresTimeline.from(featuresElement, {
      delay: 2,
      stagger: 0.2,
      opacity: 0,
      duration: 1,
    });

    return () => {
      featuresTimeline.kill();
    };
  }, [featuresRef]);

  return (
    <section
      className="w-full md:w-2/3 md:mx-auto p-2 box-border"
      id="features"
      ref={featuresRef}
    >
      <h2 className="scroll-m-20 text-center my-4 pb-2 text-3xl md:text-5xl font-semibold tracking-tight first:mt-0">
        Features
      </h2>
      <h4 className="scroll-m-20 text-center my-4 pb-2 md:text-xl font-semibold tracking-tight first:mt-0">
        Discover tools designed to make learning easier, faster, and more
        effective.
      </h4>
      <div
        id="feature-container"
        className="flex max-md:flex-wrap justify-center gap-4"
      >
        {featuresList.map((feature: Feature) => (
          <Card key={feature.id} className="w-[90vw] md:w-md">
            <CardHeader>
              <feature.icon className="text-primary" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
