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

export const getAll = (Model: any, filterFn?: (req: Request) => object) => {
   return catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      let filter: object = {};

      if (filterFn) {
         filter = filterFn(req);
      }

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

export const createOne = (Model: any, customizeRequestBody?: (req: Request) => void) => {
   return catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      if (customizeRequestBody) {
         customizeRequestBody(req);
      }
      console.log(req.body);
      try {
         const doc = await Model.create(req.body);

         console.log(doc);

         res.status(201).json({
            status: 'success',
            doc,
         });
      } catch (error) {
         console.error('Error creating cart:', error);
         res.status(500).json({ status: 'error', message: 'Failed to create cart' });
      }
   });
};

export const updateOne = (Model: any) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         console.log(req.body);

         console.log(req.params.id);

         const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
         });

         console.log(doc);

         if (!doc) {
            return next(new AppError('No document found with that ID', 404));
         }

         res.status(200).json({
            status: 'success',
            data: {
               data: doc,
            },
         });
      } catch (err) {
         console.log(err);
      }
   });
};

export const getOne = (Model: any, populateOptions?: any) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let query = Model.findById(req.params.id);
      if (populateOptions) query = query.populate(populateOptions);
      const doc = await query;

      if (!doc) {
         return next(new AppError('No document found with that ID', 404));
      }
      res.status(200).json({
         status: 'success',
         doc,
      });
   });
};

export const deleteOne = (Model: any) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) {
         return next(new AppError('No document found with that ID', 404));
      }
      res.status(204).json({
         status: 'success',
         data: null,
      });
   });
};
