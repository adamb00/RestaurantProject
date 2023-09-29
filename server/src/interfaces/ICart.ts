import { Document, ObjectId } from 'mongoose';

export interface ICartItem {
   food: ObjectId;
   name: string;
   price: number;
   quantity: number;
}

export interface ICart extends Document {
   user: ObjectId;
   items: ICartItem[];
   createdAt: Date;
}
