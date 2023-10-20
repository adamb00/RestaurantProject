import { useState } from 'react';

export const useTogglePasswordVisibility = () => {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

   const togglePasswordVisibility = () => {
      setIsPasswordVisible(visible => !visible);
   };

   return { togglePasswordVisibility, isPasswordVisible };
};
