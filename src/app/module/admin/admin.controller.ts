import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminService.blockUser(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is Block successfully',
  });
});

const deleteBlogByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminService.deleteBlogByAdmin(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is delete successfully',
  });
});

export const AdminController = {
  blockUser,
  deleteBlogByAdmin,
};
