"use server";
import { auth } from "@/lib/Auth/auth";
import { authClient, hasPermissionToDeleteBlog, hasPermissionToDeleteComment, hasPermissionToUpdateBlog } from "@/lib/Auth/auth-client";
import connectDB from "@/lib/Database/connection";
import { Comment, CommentDataType } from "@/lib/Database/Models/comments.model"
import mongoose from "mongoose";
import { cacheTag, revalidatePath, updateTag, } from "next/cache";

export const postComment = async ({ comment, user, blog, slug }: CommentDataType & { slug: string }): Promise<{ status: string, message: string }> => {
    try {
        await connectDB();
        blog = new mongoose.Types.ObjectId(blog);

        const newComment = await Comment.create({ comment, user, blog });

        if (newComment) {
            updateTag(blog as unknown as string);
            revalidatePath(`/blogs/${slug}`);
            return { status: "success", message: "Comment created successfully" };
        }
        else {
            return { status: "error", message: "Failed to create comment" };
        }
    } catch (error) {
        console.error("Error creating comment:", error);
        return { status: "error", message: "Failed to create comment" }
    }
}

export const getComments = async (blogId: string): Promise<CommentDataType[]> => {
    "use cache";
    cacheTag(blogId);
    try {
        await connectDB();
        const comments = await Comment.find({ blog: blogId }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(comments));
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
}

export const deleteComment = async (commentId: string, userId: string, blog: string, slug: string): Promise<{ status: string, message: string }> => {
    const hasPermission = await canDeleteComment(userId, commentId);

    if (!hasPermission) {
        return { status: "error", message: "You do not have permission to delete this comment" };
    }
    try {
        await connectDB();
        await Comment.findByIdAndDelete(commentId);
        updateTag(blog as unknown as string);
        revalidatePath(`/blogs/${slug}`);
        return { status: "success", message: "Comment deleted successfully" };
    } catch (error) {
        console.error("Error deleting comment:", error);
        return { status: "error", message: "Failed to delete comment" };
    }
}

export const canDeleteComment = async (
    userId: string,
    commentId: string
): Promise<boolean> => {
    try {
        await connectDB();

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return false;
        }

        // Check if user is the owner
        const isOwner =
            comment.user?.id === userId;

        // Check if user has admin delete permission
        const hasPermission = await auth.api.userHasPermission({
            body: {
                userId: userId, //the user id
                permissions: {
                    comment: ["delete"], // This must match the structure in your access control
                },
            },
        }).then((res) => res?.success);

        const isAdmin = hasPermission ?? false;
        return isOwner || isAdmin;
    } catch (error) {
        console.error("Error checking comment permissions:", error);
        return false;
    }
};