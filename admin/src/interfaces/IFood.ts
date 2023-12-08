export default interface IFood {
   name: string;
   price: number;
   description: string;
   type: string;
   createdAt: Date;
   isAvailable: boolean;
   isVegetarian: boolean;
   size: string[];
   meatType: string | null;
   needSide: boolean;
   _id: string;
   glutenFree: boolean;
   canMakeGlutenFree: boolean;
   lactoseFree: boolean;
   canMakeLactoseFree: boolean;
   image: string;
}
