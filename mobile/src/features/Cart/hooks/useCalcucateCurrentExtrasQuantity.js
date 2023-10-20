export const useCalculateCurrentExtrasQuantity = (currentFood, toppings) => {
   if (!currentFood?.extras) return toppings.map(() => 0);

   const currentExtrasQuantity = toppings.map(topping => {
      const existingExtra = currentFood.extras.find(item => item.topping._id === topping._id);
      return existingExtra ? existingExtra.quantity : 0;
   });

   return { currentExtrasQuantity };
};
