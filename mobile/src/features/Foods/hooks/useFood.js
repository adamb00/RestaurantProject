import { useQuery } from '@tanstack/react-query';
import {
   getFoods as getFoodsFn,
   getTypes as getTypesFn,
   getOneFood as getOneFoodFn,
   getTopFavoriteFoods as getTopFavoriteFoodsFn,
} from '../services/apiFood';

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
      queryKey: ['oneFood', id],
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

export const useGetTopFavoriteFoods = () => {
   const {
      isLoading,
      data: favFoods,
      error,
   } = useQuery({
      queryKey: ['favFoods'],
      queryFn: getTopFavoriteFoodsFn,
   });

   return { isLoading, favFoods, error };
};
