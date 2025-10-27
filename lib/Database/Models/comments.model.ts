
import mongoose from "mongoose";

export type CommentDataType = {
    _id?: mongoose.Types.ObjectId;
    comment: string;
    user: {
        id: string;
        name: string;
        image: string | undefined;
    };
    blog: mongoose.Types.ObjectId | string;
}

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    user: {
        id : String,
        name: String,
        image: {
            type: String,
            default: undefined,
        },
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    }
}, {
    timestamps: true,
});

export const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);