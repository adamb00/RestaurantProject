import IFood from './IFood';

export default interface IExtrasProps {
   extra: {
      quantity: number;
      topping: IFood;
   };
}

export interface Extra {
   quantity: number;
   topping: IFood;
}
