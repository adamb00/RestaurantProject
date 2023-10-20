import { useQuery } from '@tanstack/react-query';
import { getOrders as getOrdersFn, getOneOrder as getOneOrderFn } from '../../services/apiOrders';

export const useGetOrders = ({ page = 1 }) => {
   const {
      isLoading,
      data: orders,
      error,
   } = useQuery({
      queryKey: ['orders', { page }],
      queryFn: () => getOrdersFn({ page }),
      refetchInterval: 5000,
      staleTime: 5000,
   });
   return { isLoading, orders, error };
};

export const useGetOneOrder = (id: string) => {
   const {
      isLoading,
      data: currentOrder,
      error,
   } = useQuery({
      queryKey: ['order', id],
      queryFn: () => getOneOrderFn(id),
   });

   return { isLoading, currentOrder, error };
};
