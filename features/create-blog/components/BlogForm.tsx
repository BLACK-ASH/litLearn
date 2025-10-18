"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlogEditor from "@/features/create-blog/components/BlogEditor";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/Auth/auth-client";
import { createBlog } from "@/features/create-blog/actions/create";
import { toast } from "sonner";


const blogFormSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(300),
  content: z.string().min(2),
  coverImage: z.string().optional(),
  author: z.object({
    name: z.string(),
    id: z.string(),
  }),
  tags: z.array(z.string()).optional(),
  category: z.string().default("General"),
});

export type BlogFormData = z.infer<typeof blogFormSchema>;

export default function BlogForm() {
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "Start typing...",
      coverImage: "",
      author: { name: "", id: "" },
      tags: [],
      category: "General",
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    const result = await createBlog(data);
    if (result?.status === "success") {
      form.reset();
      toast.success("Blog created successfully");
      router.push(`/blogs/${result.slug}`);
    }
    if (result?.status === "error") {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/login");
      }
    }
    form.setValue("author.name", session?.user.name || "");
    form.setValue("author.id", session?.user.id || "");
  }, [form, session, router, isPending]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input {...field} id="title" placeholder="Enter blog title" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="coverImage"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="coverImage">Cover Image</FieldLabel>
              <Input {...field} id="coverImage" placeholder="Cover image URL" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                {...field}
                id="description"
                placeholder="Short summary..."
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field id="content" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <BlogEditor content={field.value} onChange={field.onChange} />
              {/* <SimpleEditor /> */}

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" className="mt-4">
        Publish Blog
      </Button>
    </form>
  );
}
