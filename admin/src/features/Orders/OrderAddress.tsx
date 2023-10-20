import IAddress from '../../interfaces/IAddress';
import { getOrdinalSuffix } from '../../utils/helper';

interface OrderAddressType {
   address: IAddress;
}

export default function OrderAddress({ address }: OrderAddressType) {
   return (
      <div>
         <div className='order-container__street'>
            {address.street} {address.streetNumber}
         </div>
         <div className='order-container__city'>
            {address.postalCode}, {address.city}, &nbsp;
         </div>
         <div className='order-container__floor'>
            (<span>{address.floor && getOrdinalSuffix(+address.floor)} floor</span>,
            <span>&nbsp; {address.door && getOrdinalSuffix(+address.door)} door</span>,
            <span>&nbsp; {address.ring && getOrdinalSuffix(+address.ring)} ring</span>)
         </div>
      </div>
   );
}
