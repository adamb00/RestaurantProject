import { useQuery } from '@tanstack/react-query';
import { getReservations as getReservationsFn } from '../../services/apiReservations';

export const useGetReservations = ({ page = 1 }) => {
   const {
      isLoading,
      data: reservations,
      error,
   } = useQuery({
      queryKey: ['reservations', { page }],
      queryFn: () => getReservationsFn({ page }),
      staleTime: 5000,
      refetchInterval: 5000,
   });

   return { isLoading, reservations, error };
};
