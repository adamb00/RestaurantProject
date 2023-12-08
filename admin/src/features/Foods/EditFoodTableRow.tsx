import { TableRowProps } from '../../interfaces/ITableRow';
import Table from '../../ui/Table';

import { CiEdit } from 'react-icons/ci';
import { useTableMenuButton } from '../../hooks/useTableMenuButton';

import { IconContext } from 'react-icons';
import IError from '../../interfaces/IError';
import { useUpdateFood } from './useFoods';
import { useState } from 'react';
import Loader from '../../ui/Loader';
import CreateEditFoodForm from './CreateEditFoodForm';
import { FieldValues } from 'react-hook-form';

export default function EditFoodTableRow({ element, index, openIndex, setOpenIndex }: TableRowProps) {
   const [error, setError] = useState<IError>();

   const { isOpen, toggleMenu } = useTableMenuButton({ index, openIndex, setOpenIndex });

   const { updateFood, isUpdating } = useUpdateFood({
      onError: (error: IError) => {
         setError(error);
      },
   });

   const handleOnClick = async (newFoodData: FieldValues) => {
      const id = element._id;
      updateFood({ newFoodData, id });
      toggleMenu();
   };

   return (
      <>
         <Table.Row>
            <td className='table__data'>{index + 1}</td>
            <td className='table__data'>{element.name}</td>
            <td className='table__data'>{element.price}.-</td>
            <td className='table__data'>{element.type}</td>
            <td className='table__data'>{element.isAvailable ? 'Yes' : 'No'}</td>
            <td className='table__data' onClick={toggleMenu}>
               <IconContext.Provider value={{ className: 'react-icon' }}>
                  <CiEdit />
               </IconContext.Provider>
            </td>
         </Table.Row>
         {isOpen && (
            <Table.Row>
               <td className='table__data--message' colSpan={6}>
                  {isUpdating ? (
                     <Loader />
                  ) : (
                     <>
                        <CreateEditFoodForm
                           error={error}
                           handleOnClick={handleOnClick}
                           update={true}
                           isLoading={isUpdating}
                           className='edit'
                           element={element}
                        />
                     </>
                  )}
               </td>
            </Table.Row>
         )}
      </>
   );
}
