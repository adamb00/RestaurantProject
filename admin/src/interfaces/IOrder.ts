import IAddress from './IAddress';

export default interface IOrder {
   items: [];
   user: string;
   createdAt: string;
   totalPrice: number;
   address: IAddress;
   active: boolean;
   _id: string;
}
