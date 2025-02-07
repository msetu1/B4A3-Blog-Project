import z from 'zod';

// Blog Validation Schema
const blogValidateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z
    .object({
      name: z.string().optional(),
      email: z.string().email('Invalid email').optional(),
    })
    .optional(),
});

// update Blog Validation Schema
const updateBlogValidateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  content: z.string().min(1, 'Content is required').optional(),
});

export const BlogValidation = {
  blogValidateSchema,
  updateBlogValidateSchema,
};
