import Table from '../../ui/Table';
import IOrder from '../../interfaces/IOrder';
import { formatDate } from '../../utils/helper';
import { useGetOneUser } from '../Auth/useUserAuth';
import { IconContext } from 'react-icons';
import { FiEdit } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

interface OrderTableRow {
   element: IOrder;
   index: number;
}

export default function OrderTableRow({ element, index }: OrderTableRow) {
   const { currentUser } = useGetOneUser(element.user);

   return (
      <Table.Row active={element.active} key={index}>
         <td className='table__data'>{index + 1}</td>
         <td className='table__data'>{currentUser?.doc?.fullName}</td>
         <td className='table__data'>{formatDate(element.createdAt)}</td>
         <td className='table__data'>
            <NavLink to={`show-order/${element._id}`}>
               <IconContext.Provider value={{ className: 'react-icon' }}>
                  <FiEdit />
               </IconContext.Provider>
            </NavLink>
         </td>
      </Table.Row>
   );
}
