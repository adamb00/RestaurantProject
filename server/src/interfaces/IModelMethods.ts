import Ad from '../models/AdModel';
import Cart from '../models/CartModel';
import Food from '../models/FoodModel';
import Order from '../models/OrderModel';
import Reservation from '../models/ReservationModel';
import Review from '../models/ReviewModel';
import User from '../models/UserModel';
import { Document } from 'mongoose';

export interface ModelMethods<T extends Document> {
   find(filter?: object | undefined): Promise<T[]>;
   findById(id: string): Promise<T>;
   create(data: ModelType): Promise<T>;
   findByIdAndUpdate(id: string, data: object, options: any): Promise<T>;
   findByIdAndDelete(id: string): Promise<T>;
}

type ModelType =
   | typeof Ad
   | typeof Order
   | typeof Cart
   | typeof Food
   | typeof Reservation
   | typeof Review
   | typeof User;
