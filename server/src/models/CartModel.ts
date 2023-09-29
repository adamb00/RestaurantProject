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
            ref: 'Food',
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

cartSchema.pre<Query<ICart, ICart>>(/^find/, function (next): void {
   this.select('-__v');
   this.populate({
      path: 'user',
      select: 'fullName email',
   });
});

const Cart = model<ICart>('Cart', cartSchema);

export default Cart;
