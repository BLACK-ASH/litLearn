import { getComments } from "../action/comment";
import { CommentCard } from "./CommentCard";
import CommentForm from "./CommentForm";

export async function BlogComments({ id, slug }: { id: string; slug: string }) {
  const comments = await getComments(id);

  return (
    <div className="px-4 w-full md:w-2/3 lg:w-1/2 mx-auto space-y-2">
      <CommentForm blogId={id} slug={slug} />
      {comments.length !== 0 ? (
        comments?.map((comment) => (
          <CommentCard
            slug={slug}
            key={comment?._id as unknown as string}
            comment={comment}
          />
        ))
      ) : (
        <p className="text-center text-muted-foreground">No comments yet</p>
      )}
    </div>
  );
}
