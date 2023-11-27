import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import env from './utils/validateEnv';
import cors from 'cors';

import UserRouter from './routes/UserRoute';
import ReservationRouter from './routes/ReservationRoute';
import AdminRouter from './routes/AdminRoute';
import FoodRouter from './routes/FoodRoute';
import ReviewRouter from './routes/ReviewRoute';
import CartRouter from './routes/CartRoute';
import OrderRouter from './routes/OrderRoute';
import AdRouter from './routes/AdRoute';

import AppError from './utils/appError';

import { globalErrorHandler } from './controllers/ErrorController';

export default class App {
   public app: Application;

   constructor() {
      this.app = express();
      this.security();
      this.config();
      this.routes();
      this.errors();
   }

   private security(): void {
      this.app.use(cors({ origin: '*', credentials: true }));
      this.app.options('*', cors());
      this.app.use((_req: Request, res: Response, next: NextFunction) => {
         res.setHeader('Access-Control-Allow-Origin', '*');
         res.setHeader('Access-Control-Allow-Credentials', 'true');
         res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
         next();
      });
      this.app.use(express.json({ limit: '10kb' }));
      this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
   }

   private config(): void {
      if (env.NODE_ENV === 'development') this.app.use(morgan('dev'));
   }

   private routes(): void {
      this.app.use(`/api/${env.VERSION}/admin`, AdminRouter);
      this.app.use(`/api/${env.VERSION}/users`, UserRouter);
      this.app.use(`/api/${env.VERSION}/reservations`, ReservationRouter);
      this.app.use(`/api/${env.VERSION}/foods`, FoodRouter);
      this.app.use(`/api/${env.VERSION}/review`, ReviewRouter);
      this.app.use(`/api/${env.VERSION}/cart`, CartRouter);
      this.app.use(`/api/${env.VERSION}/orders`, OrderRouter);
      this.app.use(`/api/${env.VERSION}/ad`, AdRouter);
   }

   private errors(): void {
      this.app.all('*', (req: Request, _res: Response, next: NextFunction) => {
         next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
      });

      this.app.use(globalErrorHandler);
   }
}
