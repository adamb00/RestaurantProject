import IUser from './IUser';
import { Document } from 'mongoose';

export default interface IReservation extends Document {
   user: IUser;
   numOfGuests: number;
   needMenu: boolean;
   message: string;
   selectedDate: Date;
   isActive: Boolean;
   createdAt: Date;
}
