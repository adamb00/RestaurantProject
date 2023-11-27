import catchAsync from './catchAsync';
import { NextFunction, Request, Response } from 'express';

import APIFeatures from './apiFeatures';
import AppError from './appError';
import Ad from '../models/AdModel';
import { Model, Document, IfAny, Require_id } from 'mongoose';

export const getAll = <T extends Document>(Model: Model<T>, filterFn?: (req: Request) => object) => {
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

export const createOne = <T extends Document>(Model: Model<T>, customizeRequestBody?: (req: Request) => void) => {
   return catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      if (customizeRequestBody) {
         customizeRequestBody(req);
      }

      try {
         let doc;

         if (Model.modelName === 'Ad') {
            const adData = { ...req.body, expirationDate: new Date(Date.now() + 12 * 60 * 60 * 1000) };
            doc = await Model.create(adData);
         } else doc = await Model.create(req.body);

         res.status(201).json({
            status: 'success',
            doc,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ status: 'error', message: error });
      }
   });
};

export const updateOne = <T extends Document>(Model: Model<T>) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
         });

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

export const getOne = <T extends Document>(Model: Model<T>) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let query = Model.findById(req.params.id);

      const doc = (await query.exec()) as T | null;

      if (!doc) {
         return next(new AppError('No document found with that ID', 404));
      }
      res.status(200).json({
         status: 'success',
         doc,
      });
   });
};

export const deleteOne = <T extends Document>(Model: Model<T>) => {
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
