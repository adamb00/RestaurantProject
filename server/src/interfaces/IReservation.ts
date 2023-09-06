import IUser from './IUser';

export default interface IReservation {
   user: IUser;
   numOfGuests: number;
   needMenu: boolean;
   message: string;
   selectedDate: Date;
   isActive: Boolean;
   createdAt: Date;
}
