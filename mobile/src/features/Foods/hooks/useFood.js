import { useQuery } from '@tanstack/react-query';
import { getFoods as getFoodsFn, getTypes as getTypesFn, getOneFood as getOneFoodFn } from '../services/apiFood';

export const useGetFoods = () => {
   const {
      isLoading,
      data: foods,
      error,
   } = useQuery({
      queryKey: ['food'],
      queryFn: getFoodsFn,
   });

   return { isLoading, foods, error };
};
export const useGetOneFood = id => {
   const {
      isLoading,
      data: currentFood,
      error,
   } = useQuery({
      queryKey: ['oneFood'],
      queryFn: () => getOneFoodFn(id),
   });

   return { isLoading, currentFood, error };
};
export const useGetFoodTypes = () => {
   const {
      isLoading,
      data: types,
      error,
   } = useQuery({
      queryKey: ['foodTypes'],
      queryFn: getTypesFn,
   });

   return { isLoading, types, error };
};
