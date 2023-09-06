import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import env from '../utils/validateEnv';
import { UserType } from '../models/UserModel';

const signToken = (id: string): string => {
   return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

export const createAndSendToken = async (user: UserType, statusCode: number, res: Response) => {
   const token = signToken(user._id);

   res.cookie('jwt', token, {
      expires: new Date(Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: false,
   });

   user.password = undefined;
   res.status(statusCode).json({
      status: 'success',
      token,
      data: user,
   });
};
