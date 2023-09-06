import { useEffect, useRef } from 'react';

export const useScrollTo = (scrollTo, types) => {
   const ITEM_HEIGHT = 250;
   const scrollViewRef = useRef(null);

   useEffect(() => {
      if (scrollViewRef.current && scrollTo !== '') {
         const index = types.indexOf(scrollTo);
         if (index !== -1) {
            const yOffset = index * ITEM_HEIGHT;
            scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
         }
      }
   }, [scrollTo, types]);

   return { scrollViewRef };
};
