import { Router } from 'express';
import ReservationController from '../controllers/ReservationController';

const router: Router = Router();
const reservationController = new ReservationController();

router.post('/sendReservation', reservationController.sendReservation);
router.post('/sendMail', reservationController.sendMail);

router.get('/', reservationController.getAllReservation);

export default router;
