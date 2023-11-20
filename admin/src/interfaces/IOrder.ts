import IAddress from './IAddress';

export default interface IOrder {
   items: [];
   user: string;
   createdAt: string;
   totalPrice: number;
   address: IAddress;
   active: boolean;
   message: string;
   _id: string;
   coupon: { _id: string; name: string; discount: number };
}
