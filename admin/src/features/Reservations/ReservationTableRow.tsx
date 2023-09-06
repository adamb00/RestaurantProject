import IReservation from '../../interfaces/IReservation';
import Table from '../../ui/Table';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { formatDate } from '../../utils/helper';
import { useTableMenuButton } from '../../hooks/useTableMenuButton';
import Button from '../../ui/Button';
import { TableRowProps } from '../../interfaces/ITableRow';
import { IconContext } from 'react-icons';

export default function ReservationTableRow({ element, index, openIndex, setOpenIndex }: TableRowProps<IReservation>) {
   const { isOpen, toggleMenu } = useTableMenuButton({ index, openIndex, setOpenIndex });
   return (
      <>
         <Table.Row active={element.isActive}>
            <td className='table__data'>{index + 1}</td>
            <td className='table__data'>{element.user.fullName}</td>
            <td className='table__data'>{element.numOfGuests}</td>
            <td className='table__data'>{element.needMenu ? 'Yes' : 'No'}</td>
            <td className='table__data'>{formatDate(element.selectedDate.toString())}</td>
            <td className='table__data' onClick={toggleMenu}>
               <IconContext.Provider value={{ className: 'react-icon' }}>
                  {!isOpen ? <FaChevronDown /> : <FaChevronUp />}
               </IconContext.Provider>
            </td>
         </Table.Row>
         <Table.Row>
            {isOpen && (
               // TODO DESIGN TABLE DROPDOWN BOX
               <td className='table__data--message' colSpan={6}>
                  <div className='table__data--item'>Phone number: {element.user.phone}</div>
                  <div className='table__data--item'>Message: {element.message}</div>
                  <div className='table__data--item'>Email address: {element.user.email}</div>
                  <Button onClick={() => console.log('clicked')}>Done</Button>
               </td>
            )}
         </Table.Row>
      </>
   );
}
