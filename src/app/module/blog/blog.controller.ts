import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { currentUserEmail } from '../auth/auth.utils';
import { UserRegister } from '../auth/auth.model';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

// create blog
const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  const receivedEmail = currentUserEmail;

  const findUser = await UserRegister.findOne({ email: receivedEmail });

  // Check if user is found
  if (!findUser) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'User not found',
      data: null,
    });
  }

  // If user found, extract the name and email
  const { _id } = findUser;

  const author = _id;

  const blogData = {
    title,
    content,
    author,
  };

  const result = await BlogServices.createBlog(blogData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

// all blogs
const allBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.allBlogs(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Blogs are find successfully',
    data: result,
  });
});

// update Blog
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlog(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

// delete Blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BlogServices.deleteBlog(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog delete successfully',
  });
});

export const BlogController = {
  createBlog,
  allBlogs,
  updateBlog,
  deleteBlog,
};
