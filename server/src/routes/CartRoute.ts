import { Router } from 'express';
import CartController from '../controllers/CartController';
import authenticateUser from '../middlewares/authenticateUser';

const router: Router = Router();
const cartController = new CartController();

router.use(authenticateUser, cartController.setUser);

router.route('/').get(cartController.getAllCarts).post(cartController.createCart);
router
   .route('/:id')
   .get(cartController.getOneCart)
   .patch(cartController.setBody, cartController.updateOne)
   .delete(cartController.deleteOne);

export default router;