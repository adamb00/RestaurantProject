import * as handler from './../utils/handleControllers';
import Order from '../models/OrderModel';
import { NextFunction, Request, Response } from 'express';

export default class OrderController {
   public setBody = (req: Request, _res: Response, next: NextFunction) => {
      const items = req.body.cart.filter((item: { food: string; quantity: number }) => item.food && item.quantity);

      req.body = {
         user: req.body.user,
         items: items,
         address: req.body.address,
      };
      next();
   };
   public getAllOrders = handler.getAll(Order);
   public getOneOrder = handler.getOne(Order);
   public createOrder = handler.createOne(Order);
   public updateOne = handler.updateOne(Order);
   public deleteOne = handler.deleteOne(Order);
}
