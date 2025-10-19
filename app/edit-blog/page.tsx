import { getBlogBySlug } from "@/features/blogs/action/get-blog";
import EditBlogForm from "@/features/edit-blog/components/EditBlogForm";

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const { slug } = await searchParams;
  const blog = await getBlogBySlug(slug);
  if (!blog) return <div>Blog not found</div>;
  return (
    <main className="container mx-auto pt-8 scroll-mt-28 p-2">
      <h1 className="scroll-m-20 text-center my-4 pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0">
        Edit Your Own Blog
      </h1>
      <EditBlogForm blog={blog} />
    </main>
  );
};

export default page;
