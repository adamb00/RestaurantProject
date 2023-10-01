import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   createCart as createCartFn,
   updateCart as updateCartFn,
   deleteCart as deleteCartFn,
   getAllCart as getAllCartFn,
} from '../services/apiCart';

export const useGetAllCart = () => {
   const {
      isLoading,
      data: carts,
      error,
   } = useQuery({
      queryKey: ['carts'],
      queryFn: getAllCartFn,
   });

   return { isLoading, carts, error };
};

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

export const useDeleteCart = () => {
   const queryClient = useQueryClient();
   const {
      mutate: deleteCart,
      isLoading: isDeleting,
      error,
   } = useMutation({
      mutationFn: mutationData => deleteCartFn(mutationData),

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['cart'] });
      },
   });
   return { deleteCart, isDeleting, error };
};
