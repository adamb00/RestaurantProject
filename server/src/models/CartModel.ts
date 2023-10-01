import { Query, Schema, model } from 'mongoose';
import { ICart } from '../interfaces/ICart';

const cartSchema: Schema = new Schema<ICart>({
   user: {
      type: Schema.Types.ObjectId,
      // ref: 'User',
      required: [true, 'Cart must belong to a user.'],
   },
   items: [
      {
         food: {
            type: Schema.Types.ObjectId,
            // ref: 'Food',
         },
         quantity: { type: Number, required: true },
      },
   ],
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

cartSchema.index({ cart: 1, user: 1 }, { unique: true });

const Cart = model<ICart>('Cart', cartSchema);

export default Cart;
