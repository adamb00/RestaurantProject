import Button from '../../ui/Button';
import UserInput from '../../ui/UserInput';
import IError from '../../interfaces/IError';

import { useForm } from 'react-hook-form';

import { useLoginUser } from './useUserAuth';

import { IS_VALID_EMAIL } from '../../utils/helper';
import { useState } from 'react';

export default function SignIn() {
   const { control, handleSubmit } = useForm();
   const { loginUser, isLogging } = useLoginUser({
      onError: (error: IError) => {
         setError(error);
      },
   });
   const [error, setError] = useState<IError>();

   const handleOnClick = async (data: object) => {
      loginUser({ ...data });
   };

   return (
      <div className='signin'>
         <form className={`signin__form ${error ? 'signin__form--error' : 'signin__form'}`}>
            <UserInput
               placeholder='Please enter your email here'
               control={control}
               formError={error ? true : false}
               disabled={isLogging}
               name='email'
               rules={{
                  required: 'Email address is required.',
                  validate: {
                     matchPattern: IS_VALID_EMAIL,
                  },
               }}
            />
            <UserInput
               placeholder='Please enter your password here'
               type='password'
               control={control}
               formError={error ? true : false}
               disabled={isLogging}
               name='password'
               rules={{
                  required: 'Password is required.',
                  minLength: {
                     value: 8,
                     message: 'Password needs a minimum of 8 characters',
                  },
               }}
            />
            <Button disabled={isLogging} onClick={handleSubmit(handleOnClick)}>
               {isLogging ? 'Please wait..' : 'Log in'}
            </Button>
         </form>
      </div>
   );
}
