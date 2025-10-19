import BlogForm from "@/features/create-blog/components/BlogForm";

export const metadata = {
  title: "Create Blog",
  description: "Create Your Own Blog",
}
const page = () => {


  return (
    <main className="container mx-auto pt-8 scroll-mt-28 p-2">
      <h1 className="scroll-m-20 text-center my-4 pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0">
        Create Your Own Blog
      </h1>
      <BlogForm />
    </main>
  );
};

export default page;
