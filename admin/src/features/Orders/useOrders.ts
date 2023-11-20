import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   getOrders as getOrdersFn,
   getOneOrder as getOneOrderFn,
   updateOrder as updateOrderFn,
} from '../../services/apiOrders';
import { toast } from 'react-hot-toast';
import IError from '../../interfaces/IError';

interface Props {
   onError: CallableFunction;
}

interface EditProps {
   id: string;
   data: object;
}

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

export const useUpdateOrder = ({ onError }: Props) => {
   const queryClient = useQueryClient();
   const {
      mutate: updateOrder,
      isLoading: isUpdating,
      error: updateError,
   } = useMutation({
      mutationFn: ({ id, data }: EditProps) => updateOrderFn(id, data),
      onSuccess: () => {
         toast.success('Order successfully updated');
         queryClient.invalidateQueries({ queryKey: ['order'] });
      },
      onError: (error: IError) => {
         toast.error(error.message);
         onError(error);
      },
   });
   return { updateError, updateOrder, isUpdating };
};
