import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import { getBlogBySlug, getBlogViews } from "@/features/blogs/action/get-blog";
import { BlogComments } from "@/features/blogs/components/BlogComments";
import BlogContent from "@/features/blogs/components/BlogContent";
import UpdateBlogButton from "@/features/blogs/components/UpdateBlogButton";
import formatDateTime from "@/features/blogs/utility/format-date";
import type { BlogData } from "@/lib/Database/Models/blog.model";
import { HomeIcon, User as UserIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
    },
  };
}

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const blogData: BlogData | null = await getBlogBySlug(slug);
  const blogViews = await getBlogViews(slug);

  if (!blogData) return notFound();

  return (
    <main className="container min-h-[calc(100vh-150px)] mx-auto pt-8 scroll-mt-28 p-4">
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon className="size-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="hidden sm:block">
                {blogData.title}
              </BreadcrumbPage>
              <BreadcrumbPage className="sm:hidden">{`${blogData.title.slice(0, 30)}...`}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <UpdateBlogButton
          slug={blogData.slug}
          authorId={blogData.author.id.toString()}
        />
      </div>
      <div>
        <Badge variant="secondary" className="font-semibold px-4 py-1 my-4">
          {blogData.category}
        </Badge>
        <h1 className="scroll-m-20 mb-4 pb-2 text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight first:mt-0">
          {blogData?.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {blogData.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              # {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 my-4">
        <Avatar>
          <AvatarImage
            src={blogData?.author.image}
            alt={blogData?.author.name || "Author"}
          />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="test-sm font-semibold">{blogData?.author.name}</p>
          <span className="text-muted-foreground font-normal">
            Created on {formatDateTime(blogData?.createdAt)}
          </span>
        </div>
      </div>

      <Suspense fallback={<p>Loading views...</p>}>
        <p>Total views: {blogViews || blogData?.views}</p>
      </Suspense>

      {formatDateTime(blogData?.createdAt) !==
        formatDateTime(blogData?.updatedAt) && (
        <p className=" text-muted-foreground mb-4">
          Last updated on {formatDateTime(blogData?.updatedAt)}
        </p>
      )}

      {/** biome-ignore lint/performance/noImgElement: <explanation> */}
      <img
        src={blogData?.coverImage || "/default-fallback-image.png"}
        alt={blogData?.title}
        className="object-cover lg:w-[70%] h-full mx-auto rounded-md"
        sizes="auto, (max-width: 30em) 100vw, (max-width: 50em) 50vw, calc(33vw - 100px)"
        loading="lazy"
        height={450}
        width={800}
      />

      <p className="text-muted-foreground my-4">{blogData?.description}</p>

      <BlogContent html={blogData?.content} />
      <Separator className="bg-primary my-12 h-[2px] max-w-2/3 mx-auto" />
      <Suspense fallback={<p>Loading comments...</p>}>
        <BlogComments
          slug={blogData?.slug}
          id={(blogData?._id as string).toString()}
        />
      </Suspense>
    </main>
  );
};

export default page;
