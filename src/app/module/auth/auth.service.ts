import jwt from 'jsonwebtoken';
import config from '../../config';
import { TLoginUser, TRegisterUser } from './auth.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { createToken, loginUserEmail } from './auth.utils';
import { UserRegister } from './auth.model';

// user login
const loginUser = async (payload: TLoginUser) => {
  const user = await UserRegister.isUserExistsEmail(payload?.email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  // checking if the password is correct
  if (
    !(await UserRegister.isPasswordMatched(payload?.password, user?.password))
  )
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  // access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // decoded email
  const decoded = jwt.decode(accessToken) as { email: string };
  const accessTokenEmail = decoded?.email;

  loginUserEmail(accessTokenEmail);

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    email: payload.email,
    refreshToken,
  };
};

// register user service
const registerUser = async (payload: TRegisterUser) => {
  const result = await UserRegister.create(payload);
  return result;
};

// export service
export const AuthServices = {
  loginUser,
  registerUser,
};
