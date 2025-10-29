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
import { EyeIcon } from "lucide-react";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: BlogData }) => {
  return (
    <Card className="grid grid-rows-[auto_auto_1fr_auto] pt-0 overflow-clip">
      <Link
        aria-label="read-more"
        href={`/blogs/${blog.slug}`}
        className="fade-in transition-opacity duration-200 hover:opacity-70"
      >
        <span className="sr-only">click here to read more</span>
        <AspectRatio ratio={16 / 9}>
          {/** biome-ignore lint/performance/noImgElement: <explanation> */}
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
          <Badge variant="outline" className="font-bold">
            {blog.category}
          </Badge>
        </CardAction>
        <Link
          aria-label="read-more"
          href={`/blogs/${blog.slug}`}
          className="fade-in transition-opacity duration-200 hover:opacity-70"
        >
          <span className="sr-only">click here to read more</span>
          <CardTitle>{blog.title}</CardTitle>
          <CardDescription>{blog.description}</CardDescription>
        </Link>
      </CardHeader>

      <CardFooter className="flex gap-2 justify-between">
        <Button aria-label="read-more" variant={"link"} asChild>
          <Link aria-label="read-more" href={`/blogs/${blog.slug}`}>
          <span className="sr-only">click here to read more</span>
            Read more
          </Link>
        </Button>

        {blog?.author.name}
        <div className="flex text-sm text-foreground  items-center gap-2">
          <EyeIcon className="size-4 text-primary" />
          {blog?.views}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
