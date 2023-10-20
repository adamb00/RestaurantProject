import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   createFood as createFoodFn,
   getFoods as getFoodsFn,
   updateFood as updateFoodFn,
   getTypes as getTypesFn,
} from '../../services/apiFoods';
import { toast } from 'react-hot-toast';
import IError from '../../interfaces/IError';
import { FieldValues } from 'react-hook-form';

interface Props {
   onError: CallableFunction;
}

interface EditProps {
   newFoodData: FieldValues;
   id: string;
}

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

export const useGetFoods = ({ page = 1 }) => {
   const {
      isLoading,
      data: foods,
      error,
   } = useQuery({
      queryKey: ['food', { page }],
      queryFn: () => getFoodsFn({ page }),
      refetchInterval: 5000,
      staleTime: 5000,
   });
   return { isLoading, foods, error };
};

export const useCreateFood = ({ onError }: Props) => {
   const queryClient = useQueryClient();
   const {
      mutate: createFood,
      isLoading: isCreating,
      error: createError,
   } = useMutation({
      mutationFn: createFoodFn,
      onError: (error: IError) => {
         toast.error(error.message);
         onError(error);
      },
      onSuccess: () => {
         toast.success('New food successfully created');
         queryClient.invalidateQueries({ queryKey: ['food'] });
      },
   });
   return { createError, createFood, isCreating };
};

export const useUpdateFood = ({ onError }: Props) => {
   const queryClient = useQueryClient();
   const {
      mutate: updateFood,
      isLoading: isUpdating,
      error: updateError,
   } = useMutation({
      mutationFn: ({ newFoodData, id }: EditProps) => updateFoodFn(newFoodData, id),
      onSuccess: () => {
         toast.success('Food successfully updated');
         queryClient.invalidateQueries({ queryKey: ['food'] });
      },
      onError: (error: IError) => {
         toast.error(error.message);
         onError(error);
      },
   });
   return { updateError, updateFood, isUpdating };
};
