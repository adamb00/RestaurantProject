import { Control, Controller } from 'react-hook-form';

interface UploadImageProps {
   control: Control;
   name: string;
}

export default function UploadImage({ control, name }: UploadImageProps) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field: { onChange, onBlur }, fieldState: { error: fieldError } }) => (
            <div className='user-input__upload--image'>
               <input
                  type='file'
                  name={name}
                  onChange={e => {
                     const file = e.target.files && e.target.files[0];
                     if (file) {
                        onChange(file);
                     }
                  }}
                  onBlur={onBlur}
               />
               {fieldError && (
                  <p className='user-input__errorlabel'>
                     {fieldError.message || 'Something went wrong. Please try again.'}
                  </p>
               )}
            </div>
         )}
      />
   );
}
