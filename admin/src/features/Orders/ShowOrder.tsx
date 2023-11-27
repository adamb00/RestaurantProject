import { useNavigate, useParams } from 'react-router-dom';
import { useGetOneOrder, useUpdateOrder } from './useOrders';
import { useGetOneUser } from '../Auth/useUserAuth';
import Loader from '../../ui/Loader';
import { formatCurrency, formatPhoneNumber } from '../../utils/helper';
import OrderAddress from './OrderAddress';
import ShowOrderItems from './ShowOrderItems';
import { Item } from '../../interfaces/IItemProps';
import Button from '../../ui/Button';
import IError from '../../interfaces/IError';
import { useState } from 'react';

export default function ShowOrder() {
   const { id } = useParams();
   const [error, setError] = useState<IError>();

   const { updateOrder, isUpdating } = useUpdateOrder({
      onError: () => {
         setError(error);
      },
   });

   const navigation = useNavigate();

   const orderId = id ?? '';

   const { currentOrder, isLoading: isLoadingOrder } = useGetOneOrder(orderId);

   const userId = currentOrder?.doc?.user;

   const { currentUser, isLoading: isLoadingUser } = useGetOneUser(userId);

   if (isLoadingOrder || isLoadingUser) return <Loader />;

   const { doc: user } = currentUser;
   const { doc: order } = currentOrder;

   // TODO
   const handleDeclineOrder = () => {
      updateOrder({ id: order._id, data: { ...order, status: 'declined' } });
      navigation('/orders');
   };

   const handleAcceptOrder = () => {
      updateOrder({ id: order._id, data: { ...order, status: 'done' } });
      navigation('/orders');
   };

   return (
      <div className='order-container'>
         <div className='order-container__wrapper'>
            <div className='order-container__address'>
               <div className='order-container__nameAndAddress'>
                  <div className='order-container__name'>
                     {user.fullName} &nbsp;
                     <span className='order-container__phone'>{formatPhoneNumber(user.phone.toString())}</span>
                  </div>

                  <OrderAddress address={user.address} />
               </div>
               <div className='order-container__totalPrice'>{formatCurrency(order.totalPrice)}</div>
            </div>
            {order.message && (
               <div className='order-container__wrapper--message'>
                  Message from the user: &nbsp;
                  <span className='bold'>{order.message[0]?.toUpperCase() + order.message?.slice(1)}</span>
               </div>
            )}
            {order.coupon && (
               <div className='order-container__wrapper--discount'>
                  The user has {order.coupon.discount}% {order.coupon.name} discount.
               </div>
            )}
         </div>

         <div className='order-container__items'>
            {order.items.map((item: Item) => (
               <ShowOrderItems key={item._id} item={item} />
            ))}
         </div>
         <div className='order-container__buttons'>
            <Button disabled={isUpdating} className='btn btn--decline' onClick={handleDeclineOrder}>
               Decline
            </Button>
            <Button disabled={isUpdating} className='btn btn--accept' onClick={handleAcceptOrder}>
               Accept
            </Button>
         </div>
      </div>
   );
}
