import { NextFunction, Request, Response } from 'express';
import Food from '../models/FoodModel';
import catchAsync from '../utils/catchAsync';
import * as handler from './../utils/handleControllers';
import multer from 'multer';
import { upload } from '../middlewares/uploadPhoto';

export default class FoodController {
   public uploadImage = upload.single('image');

   public getFoodTypes = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const types = Food.schema.path('type').options.enum;
      const meatTypes = Food.schema.path('meatType').options.enum;

      res.status(200).json({
         status: 'success',
         types,
         meatTypes,
      });
   });
   public getAllFoods = handler.getAll(Food);
   public getOneFood = handler.getOne(Food);
   public createFood = handler.createOne(Food);
   public updateOne = handler.updateOne(Food);

   public getFoodStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const foods = await Food.aggregate([
         {
            $match: { ratingsAverage: { $gt: 4.4 } },
         },
         {
            $match: { type: { $ne: 'side' } },
         },
         {
            $match: { type: { $ne: 'suace' } },
         },
         {
            $match: { type: { $ne: 'salad' } },
         },
         {
            $match: { type: { $ne: 'topping' } },
         },
      ]);

      res.status(200).json({
         status: 'success',
         foods,
      });
   });
}
