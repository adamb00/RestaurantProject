import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';

const router: Router = Router();
const authController = new AuthController();
const userController = new UserController();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);

router.route('/:id').patch(userController.updateOneUser).get(userController.getOneUser);
router.route('/:id/updatePassword').patch(authController.updatePassword);

export default router;
