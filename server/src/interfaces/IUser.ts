import IAddress from './IAddress';
import { Document } from 'mongoose';

export default interface IUser extends Document {
   fullName: string;
   email: string;
   role: string;
   password: string;
   passwordAgain: string;
   passwordChangedAt?: Date;
   passwordResetToken?: string;
   passwordResetExpires?: number;
   createdAt: Date;
   phone: number;
   address: IAddress;
   points: number;
   birthday: Date;
   coupons: [{ name: string; discount: number; active: boolean }];
   type: string;
}
