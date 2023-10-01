import { NextFunction, Request, Response } from 'express';
import Cart from '../models/CartModel';
import * as handler from './../utils/handleControllers';

export default class CartController {
   public setUser = (req: Request, _res: Response, next: NextFunction) => {
      if (!req.body.user) req.body.user = req.user.id;

      next();
   };

   public setBody = (req: Request, _res: Response, next: NextFunction) => {
      const items = req.body.filter((item: { food: string; quantity: number }) => item.food && item.quantity);

      req.body = {
         user: req.body.user,
         items: items,
      };
      next();
   };
   public getAllCarts = handler.getAll(Cart);
   public getOneCart = handler.getOne(Cart);
   public createCart = handler.createOne(Cart);
   public updateOne = handler.updateOne(Cart);
   public deleteOne = handler.deleteOne(Cart);
}
