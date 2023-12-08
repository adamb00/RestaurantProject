import { useEffect, useState } from 'react';
import Paginator from '../../ui/Paginator';
import Table from '../../ui/Table';
import { useGetReservations } from './useReservations';
import Loader from '../../ui/Loader';
import ReservationTableRow from './ReservationTableRow';
import IReservation from '../../interfaces/IReservation';
import { ITEM_PER_PAGE } from '../../utils/constants';

export default function Reservation() {
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [openIndex, setOpenIndex] = useState<number | null>(null);

   const { reservations, isLoading } = useGetReservations({ page: currentPage });

   useEffect(() => {
      setOpenIndex(null);
   }, [currentPage]);

   if (!reservations) return <Loader />;

   return (
      <div className='reservation'>
         <Table>
            <Table.Header>
               <Table.Row status={'active'}>
                  <th className='table__head'>Index</th>
                  <th className='table__head'>Full Name</th>
                  <th className='table__head'>Number of Guests</th>
                  {/* <th className='table__head'>Need menu?</th> */}
                  <th className='table__head'>Selected Date</th>
                  <th className='table__head'>Open</th>
               </Table.Row>
            </Table.Header>
            <Table.Body>
               {reservations.res.map((el: IReservation, i: number) => (
                  <ReservationTableRow
                     element={el}
                     index={(currentPage - 1) * ITEM_PER_PAGE + i}
                     key={i}
                     openIndex={openIndex}
                     setOpenIndex={setOpenIndex}
                  />
               ))}
            </Table.Body>
         </Table>
         {!isLoading && (
            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={reservations.totalItems} />
         )}
      </div>
   );
}
