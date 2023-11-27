import { useQuery } from '@tanstack/react-query';
import { getAllAds as getAllAdsFn } from '../services/apiAd';

export const useGetAllAds = () => {
   const {
      isLoading,
      data: ads,
      error,
   } = useQuery({
      queryKey: ['ads'],
      queryFn: getAllAdsFn,
      refetchInterval: 10000,
      staleTime: 10000,
   });
   return { isLoading, ads, error };
};
