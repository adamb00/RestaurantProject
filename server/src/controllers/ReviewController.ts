import { NextFunction, Request, Response } from 'express';
import Review from '../models/ReviewModel';
import * as handler from './../utils/handleControllers';

export default class ReviewController {
   public setUserAndFood = (req: Request, _res: Response, next: NextFunction) => {
      if (!req.body.food) req.body.food = req.params.foodId;
      if (!req.body.user) req.body.user = req.user.id;

      next();
   };
   public getAllReview = handler.getAll(Review, (req: Request) => {
      if (req.params.foodId) return { food: req.params.foodId };
      return {};
   });
   public getOneReview = handler.getOne(Review);
   public createReview = handler.createOne(Review, (req: Request) => {
      req.body.food = req.params.foodId;
   });
   public deleteOne = handler.deleteOne(Review);
   public updateOne = handler.updateOne(Review);
}
