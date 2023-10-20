import { Extra } from '../../interfaces/IExtras';
import IItemProps from '../../interfaces/IItemProps';
import ShowOrderItemExtras from './ShowOrderItemExtras';

export default function ShowOrderItems({ item }: IItemProps) {
   return (
      <div className='order-container__food'>
         <div className='order-container__food--item'>
            <div>
               <span className='order-container__quantity'>{item.quantity}x</span> {item.food.name}
            </div>
            <span className='order-container__message'>{item.message && `(${item.message})`}</span>
         </div>

         {item?.extras?.map((extra: Extra) => (
            <ShowOrderItemExtras extra={extra} key={extra.topping._id} />
         ))}
      </div>
   );
}
