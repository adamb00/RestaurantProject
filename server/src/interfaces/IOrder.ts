import { ObjectId, Document } from 'mongoose';
import { ICartItem } from './ICart';
import IAddress from './IAddress';

export default interface IOrder extends Document {
   items: ICartItem[];
   user: ObjectId;
   createdAt: Date;
   totalPrice: number;
   numOfItems: number;
   address: IAddress;
   status: string;
   message: string;
   coupon: { _id: string; name: string; discount: number; expires: number };
}
