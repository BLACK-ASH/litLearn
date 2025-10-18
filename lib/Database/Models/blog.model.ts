import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";
// 1️⃣ Define a TypeScript interface for the Blog
export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  author: {
    name: string;
    id: mongoose.Types.ObjectId;
  };
  tags?: string[];
  category?: string;
  views: number;
}

// 2️⃣ Create the Schema
const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    coverImage: {
      type: String,
      default: "",
    },
    author: {
      name: { type: String, required: true },
      id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: "General",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// 3️⃣ Pre-save middleware to auto-generate slug if missing
BlogSchema.pre("save", async function (next) {
  if (!this.slug && this.title) {
     const baseSlug = slugify(this.title, {
        lower: true,
        strict: true,
      });
    
      let slug = baseSlug;
      let count = 1;
    
      // Use dynamic model reference
      while (await (this.constructor as typeof Blog).findOne({ slug })) {
        slug = `${baseSlug}-${count}`;
        count++;
      }
    
      this.slug = slug;
      next();
  }
  next();
});

// 4️⃣ Create or reuse the model
const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
