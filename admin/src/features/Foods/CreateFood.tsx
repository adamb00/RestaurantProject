import { FieldValues, useForm } from 'react-hook-form';
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

   const handleOnClick = async (data: FieldValues) => {
      const price = [];
      if (data['28cmPrice']) price.push({ size: '28cm', price: +data['28cmPrice'] });
      if (data['32cmPrice']) price.push({ size: '32cm', price: +data['32cmPrice'] });
      if (data['52cmPrice']) price.push({ size: '52cm', price: +data['52cmPrice'] });

      delete data['28cmPrice'];
      delete data['32cmPrice'];
      delete data['52cmPrice'];

      console.log(price);

      createFood({ ...data, price }, { onSuccess: () => reset() });
   };

   return <CreateEditFoodForm error={error} handleOnClick={handleOnClick} isLoading={isCreating} />;
}
