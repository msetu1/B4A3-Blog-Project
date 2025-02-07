import mongoose, { Schema } from 'mongoose';
import { TBlog } from './blog.interface';

// Blog Schema Definition
const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  },
);

// blog Model Creation
export const Blog = mongoose.model<TBlog>('Blog', blogSchema);
