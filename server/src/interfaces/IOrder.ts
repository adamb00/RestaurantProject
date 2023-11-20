import { ObjectId } from 'mongoose';
import { ICart, ICartItem } from './ICart';
import IAddress from './IAddress';

export default interface IOrder extends Document {
   items: ICartItem[];
   user: ObjectId;
   createdAt: Date;
   totalPrice: number;
   address: IAddress;
   active: boolean;
   message: string;
   coupon: { _id: string; name: string; discount: number; expires: number };
}
