import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import User, { UserType } from '../models/UserModel';

export default (...roles: string[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password) return next(new AppError('Please provide us your email and password.', 400));

      const user: UserType = await User.findOne({ email }).select('+password');

      if (!roles.includes(user.role)) {
         return next(new AppError('You do not have permission to perform this action', 403));
      }

      next();
   };
};
