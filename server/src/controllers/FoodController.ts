import { NextFunction, Request, Response } from 'express';
import Food from '../models/FoodModel';
import catchAsync from '../utils/catchAsync';
import * as handler from './../utils/handleControllers';

export default class FoodController {
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
   public createFood = handler.createOne(Food);
   public updateOne = handler.updateOne(Food);
}
