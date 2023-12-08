import { useState } from 'react';
import { useGetOrders } from './useOrders';
import Loader from '../../ui/Loader';
import Table from '../../ui/Table';
import IOrder from '../../interfaces/IOrder';
import OrderTableRow from './OrderTableRow';
import { ITEM_PER_PAGE } from '../../utils/constants';
import Paginator from '../../ui/Paginator';

export default function Order() {
   const [currentPage, setCurrentPage] = useState<number>(1);
   const { orders, isLoading } = useGetOrders({ page: currentPage });

   if (isLoading || !orders) return <Loader />;

   return (
      <div className='order'>
         <Table>
            <Table.Header>
               <Table.Row status={orders.res.status}>
                  <th className='table__head'>Index</th>
                  <th className='table__head'>User</th>
                  <th className='table__head'>Created</th>
                  <th className='table__head'>Edit</th>
               </Table.Row>
            </Table.Header>
            <Table.Body>
               {orders.res.map((el: IOrder, i: number) => (
                  <OrderTableRow element={el} index={(currentPage - 1) * ITEM_PER_PAGE + i} key={i} />
               ))}
            </Table.Body>
         </Table>
         {!isLoading && (
            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={orders.totalItems} />
         )}
      </div>
   );
}
