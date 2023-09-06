import catchAsync from './catchAsync';
import { NextFunction, Request, Response } from 'express';

import APIFeatures from './apiFeatures';
import AppError from './appError';
// import IFood from '../interfaces/IFood';
// import IReservation from '../interfaces/IReservation';
// import IUser from '../interfaces/IUser';

// type GlobalModel<T extends IFood | IUser | IReservation> = {
//    Model: T;
// };

export const getAll = (Model: any) => {
   return catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      let filter: object = {};

      if (req.params.reservationId) filter = { reservation: req.params.reservationId };

      const totalItems = (await Model.find()).length;

      const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();

      const doc = await features.query;

      res.status(200).json({
         status: 'success',
         totalItems,
         doc,
      });
   });
};

export const createOne = (Model: any) => {
   return catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const doc = await Model.create(req.body);

      res.status(200).json({
         status: 'success',
         doc,
      });
   });
};

export const updateOne = (Model: any) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

      if (!doc) {
         return next(new AppError('No document found with that ID', 404));
      }

      res.status(200).json({
         status: 'success',
         data: {
            data: doc,
         },
      });
   });
};
