import { useForm } from 'react-hook-form';
import { useState } from 'react';
import IError from '../../interfaces/IError';
import { useCreateFood } from './useFoods';
import CreateEditFoodForm from './CreateEditFoodForm';

export default function CreateFood() {
   const { reset } = useForm();
   const [error, setError] = useState<IError>();
   const { createFood, isCreating } = useCreateFood({
      onError: (error: IError) => {
         setError(error);
      },
   });

   const handleOnClick = async (data: object) => {
      createFood({ ...data }, { onSuccess: () => reset() });
   };

   return <CreateEditFoodForm error={error} handleOnClick={handleOnClick} isLoading={isCreating} />;
}
