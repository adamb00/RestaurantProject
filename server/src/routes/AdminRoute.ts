import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import restrictTo from '../middlewares/restrictTo';

const router: Router = Router();
const authController = new AuthController();

router.post('/signin', restrictTo('Admin'), authController.signin);
router.post('/signout', authController.signout);

export default router;
