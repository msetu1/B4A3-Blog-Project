/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

// user login type definitions
export type TLoginUser = {
  email: string;
  password: string;
};

// user register type definitions
export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked?: boolean;
};

// user model definitions and password hashed
export interface UserModel extends Model<TRegisterUser> {
  isUserExistsEmail(email: string): Promise<TRegisterUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
