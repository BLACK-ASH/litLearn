"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/Auth/auth-client";
import { useRef } from "react";
import { toast } from "sonner";
import { postComment } from "../action/comment";

const CommentForm = ({ blogId, slug }: { blogId: string; slug: string }) => {
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await authClient.getSession().then((res) => res?.data?.user);

    if (!user) {
      toast.error("You must be logged in to comment");
      return;
    }

    if (!commentRef.current?.value) {
      toast.error("Please enter a comment");
      return;
    }

    const res = await postComment({
      comment: commentRef.current.value,
      user: {
        id: user.id,
        name: user.name,
        image: user?.image || undefined,
      },
      blog: blogId,
      slug,
    });

    if (res.status === "success") {
      toast.success(res.message);
      commentRef.current.value = "";
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form
      aria-label="comment"
      onSubmit={handleSubmitComment}
      className="grid w-full gap-3"
    >
      <Label htmlFor="message-2">Enter Your Comment</Label>
      <Textarea
        ref={commentRef}
        placeholder="Type your message here."
        id="message-2"
      />
      <Button
        aria-label="submit-comment"
        type="submit"
        className="w-1/2 md:w-40"
      >
        comment
      </Button>
    </form>
  );
};

export default CommentForm;
