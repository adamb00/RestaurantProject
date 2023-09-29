import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCart as createCartFn, updateCart as updateCartFn } from '../services/apiCart';

export const useCreateCart = () => {
   const queryClient = useQueryClient();
   const {
      mutate: createCart,
      isLoading: isCreating,
      error,
   } = useMutation({
      mutationFn: mutationData => createCartFn(mutationData),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['cart'] });
      },
   });

   return { createCart, isCreating, error };
};

export const useUpdateCart = () => {
   const queryClient = useQueryClient();
   const {
      mutate: updateCart,
      isLoading: isUpdating,
      error,
   } = useMutation({
      mutationFn: mutationData => updateCartFn(mutationData),

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['cart'] });
      },
   });
   return { updateCart, isUpdating, error };
};
