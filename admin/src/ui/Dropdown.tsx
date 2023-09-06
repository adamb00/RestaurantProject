import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface DropdownProps {
   control: Control;
   name: string;
   options: string[];
   rules?: RegisterOptions;
   formError?: boolean;
   initialValue?: string | null;
}

export default function Dropdown({ control, name, options, formError, rules, initialValue }: DropdownProps) {
   return (
      <Controller
         control={control}
         name={name}
         rules={rules}
         render={({ field: { value, onChange, onBlur }, fieldState: { error: fieldError } }) => (
            <div className='user-input'>
               <select
                  className={`user-input__select ${formError || fieldError ? 'user-input__select--error' : ''}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  defaultValue={initialValue || 'Please select a type'}
               >
                  <option value={0}>Please select a type</option>
                  {options.map((opt, i) => (
                     <option key={i + 1} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                     </option>
                  ))}
               </select>
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
