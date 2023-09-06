import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router: Router = Router();
const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);

export default router;
