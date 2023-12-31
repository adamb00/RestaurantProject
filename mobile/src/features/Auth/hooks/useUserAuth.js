import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   createUser as createUserFn,
   loginUser as loginUserFn,
   logoutUser as logoutUserFn,
   updateUser as updateUserFn,
   getCurrentUser as getCurrentUserFn,
} from '../services/apiUsers';
import { useAuth } from '../../../contexts/AuthContext';
import Toast from 'react-native-toast-message';

export const getCurrentUser = id => {
   const {
      isLoading,
      data: currentUser,
      error,
   } = useQuery({
      queryKey: ['currentUser', id],
      queryFn: () => getCurrentUserFn(id),
   });

   return { isLoading, currentUser, error };
};

export const useCreateUser = () => {
   const queryClient = useQueryClient();

   const {
      mutate: createUser,
      isLoading: isCreating,
      error,
   } = useMutation({
      mutationFn: createUserFn,
      onSuccess: data => {
         if (data.errors) {
            const errorObject = {};
            data.errors.forEach(errorString => {
               const [field, message] = errorString.split(': ');
               errorObject[field] = message;
            });
            return errorObject;
         }
         Toast.show({
            type: 'success',
            text1: 'Successfully signed up',
         });

         queryClient.invalidateQueries({ queryKey: ['user'] });
      },
      onError: err => {
         console.error('Error during user creation:', err);
      },
   });

   return { createUser, isCreating, error };
};

export const useLoginUser = () => {
   const {
      mutate: loginUser,
      isLoading: isLogging,
      isSuccess,
   } = useMutation({
      mutationFn: loginUserFn,
   });

   return { loginUser, isLogging, isSuccess };
};

export const useLogoutUser = () => {
   const queryClient = useQueryClient();
   const { signout } = useAuth();

   const { mutate: singoutUser, isLoading: isSigningOut } = useMutation({
      mutationFn: logoutUserFn,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['user'] });
         signout();
      },
      onError: err => console.error(err.message),
   });

   return { singoutUser, isSigningOut };
};

export const useUpdateUser = () => {
   const queryClient = useQueryClient();
   const { updateUser: updateContext } = useAuth();
   const {
      mutate: updateUser,
      isLoading: isUpdating,
      error: mutationError,
   } = useMutation({
      mutationFn: mutationData => {
         if (mutationData.password) updateUserFn(mutationData);
         else {
            updateUserFn(mutationData);
            updateContext(mutationData);
         }
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['user'] });
      },
   });

   return { updateUser, isUpdating, mutationError };
};
