import { Model, Query, Schema, model } from 'mongoose';
import IReservation from '../interfaces/IReservation';

const reservationSchema: Schema = new Schema<IReservation>({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Reservation must belong to a user.'],
   },
   numOfGuests: {
      type: Number,
      required: [true, 'Reservation must contain the number of the guests.'],
   },
   needMenu: {
      type: Boolean,
   },
   message: {
      type: String,
      required: [true, 'Reservation must contain a message'],
   },
   selectedDate: {
      type: Date,
      required: [true, 'Reservation must contain a date'],
   },
   isActive: {
      type: Boolean,
      default: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

reservationSchema.pre<Query<IReservation, IReservation>>(/^find/, function (next) {
   this.populate({
      path: 'user',
   });
   next();
});

const Reservation: Model<IReservation> = model<IReservation>('Reservation', reservationSchema);

export default Reservation;
