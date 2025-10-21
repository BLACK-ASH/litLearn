import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBlogBySlug } from "@/features/blogs/action/get-blog";
import BlogContent from "@/features/blogs/components/BlogContent";
import UpdateBlogButton from "@/features/blogs/components/UpdateBlogButton";
import type { BlogData } from "@/lib/Database/Models/blog.model";
import { ArrowLeft, Eye, User2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const blogData: BlogData | null = await getBlogBySlug(slug);
  return {
    title: blogData?.title,
    description: blogData?.description,
    openGraph: {
      title: blogData?.title,
      description: blogData?.description,
      images: [blogData?.coverImage || "/default-fallback-image.png"],
    }
  };
}

// export const revalidate = 604800; // revalidate per week

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const blogData: BlogData | null = await getBlogBySlug(slug);

  if (!blogData) return notFound();

  return (
    <main className="container min-h-[calc(100vh-150px)] mx-auto pt-8 scroll-mt-28 p-2">
      <div className="flex justify-between items-center">
        <Button className="my-2" asChild>
          <Link href="/blogs">
            <ArrowLeft className="mr-2" />
            Go Back
          </Link>
        </Button>
        <UpdateBlogButton
          slug={blogData.slug}
          authorId={blogData.author.id.toString()}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{blogData?.title}</CardTitle>
          <CardDescription>{blogData?.description}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1.5">
          <p>
            <span className="font-medium text-foreground/80">Category:</span>{" "}
            <span className="text-foreground">{blogData?.category || "—"}</span>
          </p>
          <p>
            <span className="font-medium text-foreground/80">Tags:</span>{" "}
            <span className="text-foreground">
              {blogData?.tags?.length ? blogData.tags.join(", ") : "No tags"}
            </span>
          </p>
          <p>
            <span className="font-medium text-foreground/80">Created:</span>{" "}
            {new Date(blogData?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p>
            <span className="font-medium text-foreground/80">Updated:</span>{" "}
            {new Date(blogData?.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </CardContent>

        <CardFooter className="flex text-primary justify-between">
          <div className="flex  items-center gap-2">
            <User2 className="size-4" /> {blogData?.author.name}
          </div>
          <div className="flex items-center gap-2">
            <Eye className="size-4" /> {blogData?.views}
          </div>
        </CardFooter>
      </Card>

      <BlogContent html={blogData?.content} />
    </main>
  );
};

export default page;
