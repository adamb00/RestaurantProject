import { Schema, model } from 'mongoose';
import { ICart } from '../interfaces/ICart';

const cartSchema: Schema = new Schema<ICart>({
   user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Cart must belong to a user.'],
   },
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
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   message: { type: String },
});

cartSchema.index({ cart: 1, user: 1 }, { unique: true });

const Cart = model<ICart>('Cart', cartSchema);

export const CartType = typeof Cart;

export default Cart;
