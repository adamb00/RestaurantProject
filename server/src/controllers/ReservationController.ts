import Reservation from '../models/ReservationModel';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import Email from '../utils/email';
import User, { UserType } from '../models/UserModel';
import * as handler from '../utils/handleControllers';

export default class ReservationController {
   public getAllReservation = handler.getAll(Reservation);
   public sendReservation = handler.createOne(Reservation);

   public sendMail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.findById(req.user);
      try {
         if (user)
            await new Email(user).send(
               'Total Recall',
               `Please, call me back: ${user.phone}!\nThanks, ${user.fullName}`
            );
         res.status(200).json({
            status: 'success',
            message: 'Request sent to email!',
         });
      } catch (err) {
         console.log(err);
      }
   });
}
