import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   getReviewsOnFood as getReviewsOnFoodFn,
   createReviewOnFood as createReviewOnFoodFn,
} from '../services/apiFood';

export const useGetReviewsOnFood = id => {
   const {
      isLoading,
      data: reviews,
      error,
   } = useQuery({
      queryKey: ['reviewOnFood'],
      queryFn: () => getReviewsOnFoodFn(id),
   });

   return { isLoading, reviews, error };
};

export const useCreateReviewOnFood = () => {
   const queryClient = useQueryClient();
   const {
      mutate: createReview,
      isLoading: isCreating,
      error,
   } = useMutation({
      mutationFn: mutationData => createReviewOnFoodFn(mutationData),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['reviewOnFood'] });
      },
      onError: err => {
         console.log(err);
      },
   });

   return { createReview, isCreating, error };
};
