"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";

// category options related to literature
const categoryOptions = [
  { value: "General", label: "General" },
  { value: "Technology", label: "Technology" },
  { value: "Business", label: "Business" },
  { value: "Culture", label: "Culture" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Health", label: "Health" },
  { value: "Politics", label: "Politics" },
  { value: "Science", label: "Science" },
  { value: "Sports", label: "Sports" },
];

const blogFormSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(300),
  content: z.string().min(2),
  coverImage: z.string().optional(),
  author: z.object({
    image: z.string().optional(),
    name: z.string(),
    id: z.string(),
  }),
  tags: z.array(z.string()).optional(),
  category: z.string().default("General"),
});

export type BlogFormData = z.infer<typeof blogFormSchema>;

export default function BlogForm() {
  const router = useRouter();
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      coverImage: "",
      author: { name: "", id: "", image: undefined},
      tags: [],
      category: "General",
    },
  });

  const [tagInput, setTagInput] = useState("");

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
    form.setValue("author.image", session?.user.image || undefined);
    form.setValue("author.name", session?.user.name || "");
    form.setValue("author.id", session?.user.id || "");
  }, [form, session, router, isPending]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        {/* Title */}
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

        {/* Description */}
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                {...field}
                id="description"
                placeholder="Short summary..."
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 justify-between">
          {/* Category */}
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Tags Input */}
          <Controller
            name="tags"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Tags</FieldLabel>
                <div className="flex flex-wrap items-center gap-2 border rounded-md px-3 py-2">
                  {field.value?.map((tag, idx) => (
                    <span
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      key={idx}
                      className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(field.value?.filter((t) => t !== tag))
                        }
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    className="flex-1 outline-none bg-transparent text-sm"
                    placeholder="Add a tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (
                        (e.key === "Enter" || e.key === ",") &&
                        tagInput.trim()
                      ) {
                        e.preventDefault();
                        if (!field.value?.includes(tagInput.trim())) {
                          field.onChange([
                            ...(field.value as string[]),
                            tagInput.trim(),
                          ]);
                        }
                        setTagInput("");
                      }
                    }}
                  />
                </div>
              </Field>
            )}
          />

          {/* Cover Image */}
          <Controller
            name="coverImage"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="col-span-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="coverImage">Cover Image</FieldLabel>
                <Input
                  {...field}
                  id="coverImage"
                  placeholder="Cover image URL"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Preview */}
        {form.watch("coverImage") ? (
          <img
            src={form.getValues("coverImage")}
            height={400}
            width={400}
            className="object-cover object-center"
            alt="cover-image"
          />
        ) : (
          <span className="text-sm text-muted-foreground">Image Preview</span>
        )}

        {/* Content */}
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field id="content" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <BlogEditor content={field.value} onChange={field.onChange} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        className="mt-4"
      >
        {form.formState.isSubmitting ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 animate-spin" />
            Publishing Blog
          </span>
        ) : (
          "Publish Blog"
        )}
      </Button>
    </form>
  );
}
