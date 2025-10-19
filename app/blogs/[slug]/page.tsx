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
import { auth } from "@/lib/Auth/auth";
import type { BlogData } from "@/lib/Database/Models/blog.model";
import { ArrowLeft, ArrowRight, Eye, User2 } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

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
  };
}

const page = async ({ params }: { params: { slug: string } }) => {
  const user = await auth.api
    .getSession({ headers: await headers() })
    .then((res) => res?.user);
  const { slug } = await params;
  const blogData: BlogData | null = await getBlogBySlug(slug);

  if (!blogData) return <div>Blog not found</div>;

  return (
    <main className="container min-h-[calc(100vh-150px)] mx-auto pt-8 scroll-mt-28 p-2">
      <div className="flex justify-between items-center">
        <Button className="my-2" asChild>
          <Link href="/blogs">
            <ArrowLeft className="mr-2" />
            Go Back
          </Link>
        </Button>
        {user?.id === blogData?.author.id.toString() && (
          <Button className="my-2" asChild>
            <Link href={`/edit-blog/?slug=${blogData?.slug}`}>
              Edit
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        )}
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
