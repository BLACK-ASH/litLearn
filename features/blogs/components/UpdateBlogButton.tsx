"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  hasPermissionToUpdateBlog,
  useSession,
} from "@/lib/Auth/auth-client";
import Link from "next/link";
import { Edit as EditIcon } from "lucide-react";

interface UpdateBlogButtonProps {
  slug: string;
  authorId: string;
}

const UpdateBlogButton = ({ slug, authorId }: UpdateBlogButtonProps) => {
  const { data: session, isPending, error } = useSession();
  const [allowed, setAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setAllowed(false);
      setLoading(false);
      return;
    }

    async function checkPermission() {
      try {
        const result = await hasPermissionToUpdateBlog();
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

  return (
    <Button variant="ghost" className="my-2" asChild>
      <Link href={`/edit-blog?slug=${slug}`}>
        <EditIcon className="size-4 text-primary" />
      </Link>
    </Button>
  );
};

export default UpdateBlogButton;
