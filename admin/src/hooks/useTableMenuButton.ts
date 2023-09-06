import { Dispatch, SetStateAction } from 'react';

interface UseTableMenuButtonProps {
   index: number | null;
   openIndex: number | null;
   setOpenIndex: Dispatch<SetStateAction<number | null>>;
}

export const useTableMenuButton = ({ index, openIndex, setOpenIndex }: UseTableMenuButtonProps) => {
   const isOpen = index === openIndex;

   const toggleMenu = () => {
      if (isOpen) {
         setOpenIndex(null);
      } else {
         setOpenIndex(index);
      }
   };

   return { toggleMenu, isOpen };
};
