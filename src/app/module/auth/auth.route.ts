import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validate';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidateSchema),
  AuthController.loginUser,
);

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidateSchema),
  AuthController.registerUser,
);

export const AuthRoutes = router;
