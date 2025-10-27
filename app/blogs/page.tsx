import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { getAllBlogs } from "@/features/blogs/action/get-blog";
import BlogPagination from "@/features/blogs/components/BlogPagination";
import BlogsContainer from "@/features/blogs/components/BlogsContainer";
import BlogSearchBar from "@/features/blogs/components/BlogSearchBar";
import BlogsContainerSkeleton from "@/features/blogs/Skeleton/BlogsContainerSkeleton";
import { HomeIcon } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
  title: "Lit Learn - Blogs",
  description: "Blogs",
};

// export const revalidate = 3600; // revalidate every hour
const page = async ({
  searchParams,
}: {
  searchParams: { slug: string; page: number; limit: number };
}) => {
  const { slug, page = 1, limit = 8 } = await searchParams;

  const { data: blogs, total } = await getAllBlogs(slug, page, limit);

  return (
    <div className="container mx-auto  min-h-[calc(100vh-150px)] pt-8 scroll-mt-28 p-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <HomeIcon className="size-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Blogs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="my-8 flex flex-col items-center">
        <h1 className="scroll-m-20 text-center text-7xl md:text-8xl lg:text-9xl text-primary uppercase font-extrabold tracking-tight text-balance">
          blogs
        </h1>
        <h3 className="scroll-m-20 text-center w-full md:w-2/3 mx-auto pb-2 text-normal md:text-xl lg:text-2xl font-normal tracking-tight first:mt-0">
          Discover the latest trends, tips, and best practices in modern web
          development. From UI components to design systems, stay updated with
          our expert insights.
        </h3>
        <Suspense>
          <BlogSearchBar />
        </Suspense>
        {slug && (
          <p className="text-muted-foreground italic">{total} Blogs Found</p>
        )}
      </div>
      <Suspense fallback={<BlogsContainerSkeleton />}>
        <BlogsContainer blogs={blogs} />
      </Suspense>
      <BlogPagination count={total} limit={limit} />
    </div>
  );
};

export default page;
