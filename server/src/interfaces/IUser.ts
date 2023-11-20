import IAddress from './IAddress';

export default interface IUser {
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
}
