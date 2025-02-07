/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { TUserRole } from '../module/auth/auth.interface';
import { UserRegister } from '../module/auth/auth.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // checking if the token is missing
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email } = decoded;

    // checking if the user exists
    const user = await UserRegister.isUserExistsEmail(email);
    // console.log('User Exists Data:', user);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }

    // checking if the user is blocked
    if (user?.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
