import IAddress from './IAddress';

export default interface IOrder {
   items: [];
   user: string;
   createdAt: string;
   totalPrice: number;
   address: IAddress;
   status: string;
   message: string;
   _id: string;
   coupon: { _id: string; name: string; discount: number };
}
