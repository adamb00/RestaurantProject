import { Schema, model } from 'mongoose';
import IOrder from '../interfaces/IOrder';
import IAddress from '../interfaces/IAddress';
import { addressSchema } from './AddressModel';

const orderSchema: Schema = new Schema<IOrder>({
   items: [
      {
         food: { type: Object, ref: 'Food' },
         quantity: { type: Number, required: true },
         message: { type: String },
         extras: {
            type: Object,
            ref: 'Food',
            quantity: { type: Number, required: true, default: 0 },
         },
      },
   ],
   user: { type: Schema.Types.ObjectId, required: [true, 'Order must belong to a user'] },
   totalPrice: Number,
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   address: { type: addressSchema, required: [true, 'Please provide us Your address.'] },
   active: { type: Boolean, default: true },
});

const Order = model<IOrder>('Order', orderSchema);
export default Order;
