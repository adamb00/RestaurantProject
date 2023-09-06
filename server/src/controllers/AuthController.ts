import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import User, { UserType } from '../models/UserModel';
import AppError from '../utils/appError';
import { createAndSendToken } from '../middlewares/createAndSendToken';
import { correctPassword } from '../middlewares/correctPassword';

import mongoose from 'mongoose';

declare global {
   namespace Express {
      interface Request {
         user: UserType;
      }
   }
}

export default class AuthController {
   public signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const newUser: UserType = await User.create(req.body);
         res.status(201).json({
            status: 'success',
            data: newUser,
         });
      } catch (err) {
         console.error('Signup Error:', err);

         if (err instanceof mongoose.Error.ValidationError) {
            const errorMessages: string[] = [];

            for (const field in err.errors) {
               if (err.errors[field].kind === 'required') {
                  errorMessages.push(`${field}: ${err.errors[field].message}`);
               }
            }

            res.status(400).json({
               status: 'error',
               errors: errorMessages,
            });
         } else {
            res.status(500).json({
               status: 'error',
               message: 'An error occurred',
            });
         }
      }
   });

   public signin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password) return next(new AppError('Please provide us your email and password.', 400));

      const user: UserType | null = await User.findOne({ email }).select('+password');

      if (!user) return next(new AppError('No user found with this email.', 404));

      if (!(await correctPassword(password, user.password))) return next(new AppError('Incorrect password.', 401));

      await createAndSendToken(user, 200, res);

      req.user = user;
   });

   public signout = (_req: Request, res: Response) => {
      res.cookie('jwt', 'loggedout', {
         expires: new Date(Date.now() + 10 * 1000),
      });
      res.status(200).json({ status: 'success' });
   };
}
