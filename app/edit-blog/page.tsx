import { getBlogBySlug } from "@/features/blogs/action/get-blog";
import { DeleteBlogButton } from "@/features/edit-blog/components/DeleteBlogButton";
import EditBlogForm from "@/features/edit-blog/components/EditBlogForm";
import { notFound } from "next/navigation";

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const { slug } = await searchParams;
  const blog = await getBlogBySlug(slug);
  if (!blog) return notFound();
  return (
    <main className="container mx-auto pt-8 scroll-mt-28 p-2">
      <div className="relative">
        <h1 className="scroll-m-20 text-center my-4 pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0">
          Edit Your Own Blog
        </h1>
        <div className="absolute -top-1 right-0">
          <DeleteBlogButton
            authorId={blog.author.id.toString()}
            slug={blog.slug}
          />
        </div>
      </div>
      <EditBlogForm blog={blog} />
    </main>
  );
};

export default page;
