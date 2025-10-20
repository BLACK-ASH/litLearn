"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteBlog } from "../actions/delete-blog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient, hasPermissionToDeleteBlog } from "@/lib/Auth/auth-client";

export function DeleteBlogButton({
  slug,
  authorId,
}: {
  slug: string;
  authorId: string;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setAllowed(false);
      setLoading(false);
      return;
    }

    async function checkPermission() {
      try {
        const result = await hasPermissionToDeleteBlog();
        const hasPermission = result.data?.success ?? false;

        // ✅ Allow if user is author OR has admin/editor delete permission
        setAllowed(session?.user.id === authorId || hasPermission);
      } catch {
        setAllowed(session?.user.id === authorId);
      } finally {
        setLoading(false);
      }
    }

    checkPermission();
  }, [session, authorId]);

  if (isPending || loading || !allowed) return null;

  const handleDeleteBlog = async () => {
    const res = await deleteBlog(slug, authorId);

    if (res?.status === "success") {
      toast.success(res.message);
      router.push("/blogs");
    } else {
      toast.error(res?.message ?? "Failed to delete blog");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-red-100">
          <Trash2Icon className="text-red-500" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete your blog
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteBlog}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
