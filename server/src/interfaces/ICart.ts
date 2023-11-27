import { ObjectId, Document } from 'mongoose';
import IFood from './IFood';

export interface IExtras extends Document {
   topping: IFood;
   quantity: number;
}

export interface ICartItem extends Document {
   food: IFood | ObjectId;
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
