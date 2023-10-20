import { useState } from 'react';

export const useSetAddress = (postalCode, city, street, streetNumber) => {
   const intialAddress = {
      postalCode,
      city,
      street,
      streetNumber,
      floor: null,
      door: null,
      ring: null,
   };
   const [address, setAddress] = useState(intialAddress);

   return { address, setAddress };
};
