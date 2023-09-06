export default interface IFood {
   name: string;
   price: number;
   description: string;
   type: string;
   createdAt: Date;
   isAvailable: boolean;
   isVegetarian: boolean;
   meatType: string | null;
   needSide: boolean;
   _id: string;
   glutenFree: boolean;
   canMakeGlutenFree: boolean;
   lactoseFree: boolean;
   canMakeLactoseFree: boolean;
}
