import { Dispatch, SetStateAction } from 'react';
import Button from './Button';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ITEM_PER_PAGE } from '../utils/constants';

interface PaginatorProps {
   currentPage: number;
   totalItems: number;
   setCurrentPage: Dispatch<SetStateAction<number>>;
}

export default function Paginator({ currentPage, setCurrentPage, totalItems }: PaginatorProps) {
   const lastPage = Math.ceil(totalItems / ITEM_PER_PAGE);
   return (
      <div className='paginator'>
         <div className='paginator__back'>
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className='btn btn--paginator'>
               <HiChevronDoubleLeft />
            </Button>
            <Button
               disabled={currentPage === 1}
               onClick={() => setCurrentPage(currentPage - 1)}
               className='btn btn--paginator'
            >
               <HiChevronLeft />
            </Button>
         </div>
         <div className='paginator__forward'>
            <Button
               disabled={currentPage === lastPage}
               onClick={() => setCurrentPage(currentPage + 1)}
               className='btn btn--paginator'
            >
               <HiChevronRight />
            </Button>
            <Button
               disabled={currentPage === lastPage}
               onClick={() => setCurrentPage(lastPage)}
               className='btn btn--paginator'
            >
               <HiChevronDoubleRight />
            </Button>
         </div>
      </div>
   );
}
