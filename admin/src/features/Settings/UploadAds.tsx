import { FieldValues, useForm } from 'react-hook-form';
import UploadImage from '../../ui/UploadImage';
import Button from '../../ui/Button';
import { useCreateAd } from './useAds';
import { useState } from 'react';
import IError from '../../interfaces/IError';
import UserInput from '../../ui/UserInput';
import Dropdown from '../../ui/Dropdown';

export default function UploadAds() {
   const [error, setError] = useState<IError>();
   const { control, handleSubmit } = useForm();
   const { createAd } = useCreateAd({
      onError: (error: IError) => {
         setError(error);
      },
   });

   if (error) console.log(error);

   const handleClick = (data: FieldValues) => {
      createAd({ ...data });
   };
   return (
      <div className='upload-ads'>
         <form action='' className='upload-ads__form'>
            <div className='upload-ads__form--group'>
               <UserInput
                  placeholder='Name of the ad'
                  control={control}
                  name='name'
                  disabled={false}
                  formError={error ? true : false}
               />
               <UserInput
                  formError={error ? true : false}
                  placeholder='Description of the ad'
                  control={control}
                  name='description'
                  disabled={false}
               />
            </div>
            <div className='upload-ads__form--group'>
               <Dropdown
                  control={control}
                  formError={error ? true : false}
                  name='type'
                  options={['Svédasztal', 'Egyéb hirdetés']}
               />
               <UploadImage name='image' control={control} />
            </div>
            <Button onClick={handleSubmit(handleClick)}>Submit Ad</Button>
         </form>
      </div>
   );
}
