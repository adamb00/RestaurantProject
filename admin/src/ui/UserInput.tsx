import { Controller, Control, RegisterOptions } from 'react-hook-form';

interface UserInputProps {
   placeholder?: string;
   type?: string;
   name: string;
   initialValue?: string | boolean | number;
   control: Control;
   rules?: RegisterOptions;
   disabled: boolean;
   formError?: boolean;
   message?: boolean;
   checked?: boolean;
   className?: string;
}

export default function UserInput({
   placeholder,
   type = 'text',
   control,
   name,
   initialValue = '',
   rules,
   disabled,
   formError,
   message = false,
   checked,
   className,
}: UserInputProps) {
   return (
      <Controller
         control={control}
         name={name}
         defaultValue={type === 'checkbox' ? false : initialValue}
         rules={rules}
         render={({ field: { value, onChange, onBlur }, fieldState: { error: fieldError } }) => (
            <div className={`${type === 'checkbox' ? 'user-input__checkbox--item' : 'user-input'}`}>
               {!message ? (
                  <input
                     defaultChecked={checked}
                     type={type}
                     disabled={disabled}
                     placeholder={placeholder}
                     value={type === 'checkbox' ? false : value}
                     className={`${
                        type === 'checkbox'
                           ? 'user-input__input--checkbox'
                           : className
                           ? `user-input__input--${className}`
                           : 'user-input__input'
                     } ${formError || fieldError ? 'user-input__input--error' : ''}`}
                     onBlur={onBlur}
                     onChange={onChange}
                  />
               ) : (
                  <textarea
                     disabled={disabled}
                     placeholder={placeholder}
                     value={value}
                     className={`user-input__input ${
                        formError || fieldError
                           ? 'user-input__input--error'
                           : className
                           ? `user-input__input--${className}`
                           : 'user-input__input'
                     }`}
                     onBlur={onBlur}
                     onChange={onChange}
                  />
               )}
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
