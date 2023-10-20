import { Extra } from './IExtras';
import IFood from './IFood';

export default interface IItemProps {
   item: {
      food: IFood;
      quantity: number;
      extras: Extra[];
      message: string;
      _id: string;
   };
}

export interface Item {
   food: IFood;
   quantity: number;
   extras: Extra[];
   message: string;
   _id: string;
}
