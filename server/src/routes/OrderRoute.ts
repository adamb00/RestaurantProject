import authenticateUser from '../middlewares/authenticateUser';
import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import { setUser } from '../middlewares/setUser';

const router: Router = Router();
const orderController = new OrderController();

// router.use(authenticateUser, setUser);

router
   .route('/')
   .get(orderController.getAllOrders)
   .post(authenticateUser, setUser, orderController.setBody, orderController.createOrder);

router.route('/:id').get(orderController.getOneOrder);
export default router;
