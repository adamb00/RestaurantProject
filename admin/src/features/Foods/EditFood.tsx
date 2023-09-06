import { useState } from 'react';
import Table from '../../ui/Table';
import { useGetFoods } from './useFoods';
import Paginator from '../../ui/Paginator';
import Loader from '../../ui/Loader';
import IFood from '../../interfaces/IFood';
import { ITEM_PER_PAGE } from '../../utils/constants';
import EditFoodTableRow from './EditFoodTableRow';

export default function EditFood() {
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [openIndex, setOpenIndex] = useState<number | null>(null);

   const { foods, isLoading } = useGetFoods({ page: currentPage });

   if (!foods) return <Loader />;
   return (
      <div className='edit-food'>
         <Table>
            <Table.Header>
               <Table.Row active={false}>
                  <th className='table__head'>Index</th>
                  <th className='table__head'>Name</th>
                  <th className='table__head'>Price</th>
                  <th className='table__head'>Type</th>
                  <th className='table__head'>Available?</th>
                  <th className='table__head'>Edit</th>
               </Table.Row>
            </Table.Header>
            <Table.Body>
               {foods.res.map((element: IFood, i: number) => (
                  <EditFoodTableRow
                     element={element}
                     key={element._id}
                     index={(currentPage - 1) * ITEM_PER_PAGE + i}
                     openIndex={openIndex}
                     setOpenIndex={setOpenIndex}
                  />
               ))}
            </Table.Body>
         </Table>
         {!isLoading && (
            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={foods.totalItems} />
         )}
      </div>
   );
}
