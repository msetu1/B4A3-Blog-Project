import mongoose from 'mongoose';
import { UserRegister } from '../auth/auth.model';
import { currentUserEmail } from '../auth/auth.utils';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createBlog = async (payload: TBlog) => {
  const isBlogAlreadyExist = await Blog.findOne({ title: payload.title });

  if (isBlogAlreadyExist) {
    throw new Error('This Blog Already Exist ! ');
  }
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

const allBlogs = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Blog.find().populate('author'), query)
    .addSearch(['title', 'content'])
    .addSorting()
    .addFilter();

  const blogs = await queryBuilder.queryModel;
  return blogs;
};

const updateBlog = async (id: string, payload: Partial<TBlog>) => {
  const receivedEmail = currentUserEmail;

  const findUser = await UserRegister.findOne({ email: receivedEmail });
  if (findUser?.role === 'admin') {
    throw new Error('Admin Cannot Update Any Blog !');
  }
  const result = await Blog.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBlog = async (id: string) => {
  const receivedEmail = currentUserEmail;

  const findUser = await UserRegister.findOne({ email: receivedEmail });
  if (!findUser) {
    throw new Error('You want to login first !! ');
  }

  const { _id: findUserId } = findUser;

  const myBlogs = await Blog.find({ author: findUserId });
  if (!myBlogs || myBlogs.length === 0) {
    throw new Error('No blogs found for this user');
  }

  const matchBlog = myBlogs.find((blog) =>
    blog._id.equals(new mongoose.Types.ObjectId(id)),
  );

  // console.log(matchBlog)
  if (!matchBlog) {
    throw new Error('This Blog Blog does not belong for you ! ');
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  createBlog,
  allBlogs,
  updateBlog,
  deleteBlog,
};
