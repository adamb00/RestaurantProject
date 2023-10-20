import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   loginUser as loginUserFn,
   logoutUser as logoutUserFn,
   getOneUser as getOneUserFn,
} from '../../services/apiUsers';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import IError from '../../interfaces/IError';

interface Props {
   onError: CallableFunction;
}

export const useLoginUser = ({ onError }: Props) => {
   const { signin } = useAuth();
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const {
      mutate: loginUser,
      isLoading: isLogging,
      error: loginError,
   } = useMutation({
      mutationFn: loginUserFn,
      onError: (error: IError) => {
         toast.error(error.message);
         onError(error);
      },
      onSuccess: data => {
         queryClient.invalidateQueries({ queryKey: ['user'] });
         signin(data);
         navigate('/reservations');
      },
   });
   return { loginUser, isLogging, loginError };
};

export const useLogoutUser = () => {
   const { signout } = useAuth();
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const { mutate: logoutUser } = useMutation({
      mutationFn: logoutUserFn,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['user'] });
         signout();
         navigate('/');
      },
   });

   return { logoutUser };
};

export const useGetOneUser = (id: string) => {
   const {
      isLoading,
      data: currentUser,
      error,
   } = useQuery({
      queryKey: ['user', id],
      queryFn: () => getOneUserFn(id),
   });

   return { isLoading, currentUser, error };
};
