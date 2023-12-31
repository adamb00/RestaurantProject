import { Schema, model } from 'mongoose';
import IOrder from '../interfaces/IOrder';

import { addressSchema } from './AddressModel';
import { ICartItem } from '../interfaces/ICart';

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
   numOfItems: Number,
   createdAt: {
      type: Date,
      default: Date.now,
   },
   address: { type: addressSchema, required: [true, 'Please provide us Your address.'] },
   status: { type: String, enum: ['active', 'declined', 'done'], default: 'active' },
   message: { type: String },
   coupon: {
      name: { type: String },
      discount: { type: Number, default: 0 },
      expires: { type: Number },
   },
});

orderSchema.pre('save', function (next) {
   let totalItems = 0;

   this.items.forEach((item: ICartItem) => {
      totalItems += item.quantity;
   });

   this.numOfItems = totalItems;

   console.log(this.numOfItems);

   next();
});

const Order = model<IOrder>('Order', orderSchema);
export default Order;
