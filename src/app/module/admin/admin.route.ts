import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();
router.patch('/users/:userId/block', AdminController.blockUser);
router.delete('/blogs/:id', AdminController.deleteBlogByAdmin);

export const AdminRoutes = router;
