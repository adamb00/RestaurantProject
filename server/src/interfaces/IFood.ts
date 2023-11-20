import { Schema } from 'mongoose';

export default interface IFood {
   name: string;
   price: number;
   ratingsAverage: number;
   ratingsQuantity: number;
   description: string;
   type: string;
   slug: string;
   createdAt: Date;
   isAvailable: boolean;
   meatType: string | null;
   needSide: boolean;
   isVegetarian: boolean;
   glutenFree: boolean;
   canMakeGlutenFree: boolean;
   lactoseFree: boolean;
   canMakeLactoseFree: boolean;
   _id: Schema.Types.ObjectId;
   image: string;
}
