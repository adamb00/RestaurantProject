import { useParams } from 'react-router-dom';
import { useGetOneOrder } from './useOrders';
import { useGetOneUser } from '../Auth/useUserAuth';
import Loader from '../../ui/Loader';
import { formatPhoneNumber } from '../../utils/helper';
import OrderAddress from './OrderAddress';
import ShowOrderItems from './ShowOrderItems';
import { Item } from '../../interfaces/IItemProps';

export default function ShowOrder() {
   const id = useParams().id;

   const { currentOrder, isLoading: isLoadingOrder } = useGetOneOrder(id!);
   const { currentUser, isLoading: isLoadingUser } = useGetOneUser(currentOrder?.doc?.user);

   if (isLoadingOrder || isLoadingUser) return <Loader />;

   const { doc: user } = currentUser;
   const { doc: order } = currentOrder;

   return (
      <div className='order-container'>
         <div className='order-container__address'>
            <div className='order-container__name'>
               {user.fullName} &nbsp;
               <span className='order-container__phone'>{formatPhoneNumber(user.phone.toString())}</span>
            </div>

            <OrderAddress address={user.address} />
         </div>

         <div className='order-container__items'>
            {order.items.map((item: Item) => (
               <ShowOrderItems key={item._id} item={item} />
               // <div>
               //    <span>{item.food.name}</span>&nbsp;<span>{item.quantity}</span>
               //    {item.extras &&
               //       item.extras.map((extra: Extras) => (
               //          <div key={extra.topping._id}>
               //             <span>{extra.topping.name}</span> &nbsp; <span>{extra.quantity}</span>
               //          </div>
               //       ))}
               // </div>
            ))}
         </div>
      </div>
   );
}
