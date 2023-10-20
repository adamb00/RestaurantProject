import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendReservation as sendReservationFn, callBack as sendCallRequestFn } from '../services/apiReservation';
import Toast from 'react-native-toast-message';

export const useSendReservation = () => {
   const queryClient = useQueryClient();
   const {
      mutate: sendReservation,
      isLoading: isSending,
      error,
   } = useMutation({
      mutationFn: sendReservationFn,
      onSuccess: () => {
         Toast.show({
            type: 'success',
            text1: 'Reservation successfully sent!',
         });
         queryClient.invalidateQueries({ queryKey: ['reservation'] });
      },
   });
   return { sendReservation, isSending, error };
};

export const useSendCallRequest = () => {
   const queryClient = useQueryClient();
   const {
      mutate: sendCallRequest,
      isLoading: isSending,
      error,
   } = useMutation({
      mutationFn: sendCallRequestFn,
      onSuccess: () => {
         Toast.show({
            type: 'success',
            text1: 'Recall request successfully sent!',
         });
         queryClient.invalidateQueries({ queryKey: ['reservation'] });
      },
   });
   return { sendCallRequest, isSending, error };
};
