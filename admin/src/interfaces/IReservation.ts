import IUser from './IUser';

export default interface IReservation {
   _id: string;
   user: IUser;
   numOfGuests: number;
   needMenu: boolean;
   message: string;
   selectedDate: Date;
   isActive: boolean;
   createdAt: Date;
}
