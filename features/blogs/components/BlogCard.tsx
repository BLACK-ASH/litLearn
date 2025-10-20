import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { BlogData } from "@/lib/Database/Models/blog.model";
import { ArrowRight, Eye, User2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const BlogCard = ({ blog }: { blog: BlogData }) => {
  return (
    <Card className="grid grid-rows-[auto_auto_1fr_auto] pt-0 overflow-clip">
      <Link
        href={`/blogs/${blog.slug}`}
        className="fade-in transition-opacity duration-200 hover:opacity-70"
      >
        <AspectRatio ratio={16 / 9}>
          <img
            src={blog.coverImage || "/default-fallback-image.png"}
            alt={blog.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </AspectRatio>
      </Link>

      <CardHeader>
        <CardAction>
          <Badge variant="secondary" className="font-bold">
            {blog.category}
          </Badge>
        </CardAction>
        <Link
          href={`/blogs/${blog.slug}`}
          className="fade-in transition-opacity duration-200 hover:opacity-70"
        >
          <CardTitle>{blog.title}</CardTitle>
          <CardDescription>{blog.description}</CardDescription>
        </Link>
      </CardHeader>

      <CardFooter className="flex gap-2 justify-between">
        <Button variant={"link"} asChild>
          <Link href={`/blogs/${blog.slug}`}>
            Read more
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>

        <div className="flex text-foreground  items-center gap-2">
          <Eye className="size-4" /> {blog?.views}
        </div>

        <div className="flex text-foreground  items-center gap-2">
          <User2 className="size-4" /> {blog?.author.name}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
