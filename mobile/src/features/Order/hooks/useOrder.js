import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllOrder as getAllOrderFn, createOrder as createOrderFn } from '../services/apiOrder';

export const useGetAllOrder = () => {
   const {
      isLoading,
      data: orders,
      error,
   } = useQuery({
      queryKey: ['orders'],
      queryFn: getAllOrderFn,
   });

   return { isLoading, orders, error };
};

export const useCreateOrder = () => {
   const queryClient = useQueryClient();
   const {
      mutate: createOrder,
      isLoading: isCreating,
      error,
   } = useMutation({
      mutationFn: mutationData => createOrderFn(mutationData),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['orders'] });
      },
   });

   return { createOrder, isCreating, error };
};
