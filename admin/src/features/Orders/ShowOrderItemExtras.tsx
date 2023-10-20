import IExtrasProps from '../../interfaces/IExtras';

export default function ShowOrderItemExtras({ extra }: IExtrasProps) {
   return (
      <div className='order-container__extras'>
         <span className='order-container__quantity'>+{extra.quantity}x</span> {extra.topping.name}
      </div>
   );
}
