import { Dispatch, SetStateAction } from 'react';
// import IFood from './IFood';
// import IReservation from './IReservation';
import { FieldValues } from 'react-hook-form';

export interface TableRowProps {
   element: FieldValues;
   index: number;
   openIndex: number | null;
   setOpenIndex: Dispatch<SetStateAction<number | null>>;
}
// export interface TableRowProps<T extends IFood | IReservation> {
//    element: T;
//    index: number;
//    openIndex: number | null;
//    setOpenIndex: Dispatch<SetStateAction<number | null>>;
// }
