import * as handler from './../utils/handleControllers';
import Order from '../models/OrderModel';
import { NextFunction, Request, Response } from 'express';
import User from '../models/UserModel';
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';

export default class OrderController {
   public setBody = async (req: Request, _res: Response, next: NextFunction) => {
      const items = req.body.cart.filter((item: { food: string; quantity: number }) => item.food && item.quantity);

      req.body = {
         user: req.body.user,
         items: items,
         address: req.body.address,
         message: req.body.message,
         totalPrice: req.body.totalPrice,
         coupon: req.body.coupon,
      };

      console.log(req.body);
      next();

      const pointsToAdd = Math.round(req.body.totalPrice / 10000);
      req.user.points += pointsToAdd;

      await User.findOneAndUpdate(req.user._id, { points: req.user.points }, { new: true });
   };
   public getAllOrders = handler.getAll(Order);
   public getOneOrder = handler.getOne(Order);
   public createOrder = handler.createOne(Order);
   public updateOne = handler.updateOne(Order);
   public deleteOne = handler.deleteOne(Order);

   public getCurrentUserOrders = catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const user = await User.findOne(req.user._id);

      const features = new APIFeatures(Order.find({ user }), req.query).filter().sort().limitFields().paginate();
      const orders = await features.query;

      const numOfOrders = orders.length;

      res.status(200).json({
         status: 'success',
         numOfOrders,
         orders,
      });
   });
}
