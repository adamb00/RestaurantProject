import { Document, ObjectId } from 'mongoose';
import IFood from './IFood';

export interface IExtras {
   topping: IFood;
   quantity: number;
}

export interface ICartItem {
   food: IFood;
   name: string;
   price: number;
   quantity: number;
   extras: IExtras[];
   message: string;
}

export interface ICart extends Document {
   user: ObjectId;
   items: ICartItem[];
   createdAt: Date;
   message: string;
}
