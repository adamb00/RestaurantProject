import { useQuery } from '@tanstack/react-query';
import { getFoods as getFoodsFn, getTypes as getTypesFn } from '../services/apiFood';

export const useGetFoods = () => {
   const {
      isLoading,
      data: foods,
      error,
   } = useQuery({
      queryKey: ['food'],
      queryFn: getFoodsFn,
      refetchInterval: 5000,
      staleTime: 5000,
   });

   return { isLoading, foods, error };
};
export const useGetFoodTypes = () => {
   const {
      isLoading,
      data: types,
      error,
   } = useQuery({
      queryKey: ['foodTypes'],
      queryFn: getTypesFn,
      refetchInterval: 5000,
      staleTime: 5000,
   });

   return { isLoading, types, error };
};
