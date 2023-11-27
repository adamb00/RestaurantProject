import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAd as createAdFn } from '../../services/apiAds';
import IError from '../../interfaces/IError';
import { toast } from 'react-hot-toast';

interface Props {
   onError: CallableFunction;
}

export const useCreateAd = ({ onError }: Props) => {
   const queryClient = useQueryClient();

   const {
      mutate: createAd,
      isLoading: isCreating,
      error: createError,
   } = useMutation({
      mutationFn: createAdFn,
      onError: (error: IError) => {
         toast.error(error.message);
         onError(error);
      },
      onSuccess: () => {
         toast.success('New ad successfully created');
         queryClient.invalidateQueries({ queryKey: ['ad'] });
      },
   });
   return { createError, createAd, isCreating };
};
