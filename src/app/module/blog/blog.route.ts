import express from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validate';
const router = express.Router();

router.post(
  '/',
  validateRequest(BlogValidation.blogValidateSchema),
  BlogController.createBlog,
);
router.get('/', BlogController.allBlogs);

router.patch(
  '/:id',
  validateRequest(BlogValidation.updateBlogValidateSchema),
  BlogController.updateBlog,
);

router.delete('/:id', BlogController.deleteBlog);

export const BlogRoutes = router;
