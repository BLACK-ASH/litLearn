"use client";

import { useEffect, useState } from "react";
import { EllipsisVertical, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { CommentDataType } from "@/lib/Database/Models/comments.model";
import { canDeleteComment, deleteComment } from "../action/comment";
import { authClient } from "@/lib/Auth/auth-client";
import { toast } from "sonner";

export function CommentCard({
  comment,
  slug,
}: {
  comment: CommentDataType;
  slug: string;
}) {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const session = await authClient.getSession();
        const user = session?.data?.user;
        if (!user) return;

        const res = await canDeleteComment(
          user.id,
          comment._id as unknown as string,
        );
        setHasPermission(res);
      } catch (error) {
        console.error("Error checking permission:", error);
      }
    };

    fetchPermission();
  }, [comment._id]);

  const handleDeleteComment = async () => {
    const res = await deleteComment(
      comment._id as unknown as string,
      comment.user.id,
      comment.blog as unknown as string,
      slug,
    );
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Item className="items-start" variant="outline">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage
            src={comment?.user?.image || "/default-fallback-image.png"}
          />
          <AvatarFallback>
            {comment?.user?.name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{comment.user.name}</ItemTitle>
        <p className="text-sm text-muted-foreground">{comment.comment}</p>
      </ItemContent>
      {hasPermission && (
        <ItemActions>
          <Button
            onClick={() => handleDeleteComment()}
            size="icon-sm"
            variant="ghost"
            aria-label="Edit Comment"
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </ItemActions>
      )}
    </Item>
  );
}
