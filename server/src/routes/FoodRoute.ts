import { Router } from 'express';
import FoodController from '../controllers/FoodController';
import ReveiwRouter from './ReviewRoute';
import { upload } from '../middlewares/uploadPhoto';
import { resizeImage } from '../middlewares/uploadPhoto';

const router: Router = Router();
const foodController = new FoodController();

router.route('/types').get(foodController.getFoodTypes);

router.route('/top-fav').get(foodController.getFoodStats);

router
   .route('/')
   .get(foodController.getAllFoods)
   .post(foodController.uploadImage, resizeImage, foodController.createFood);

router.route('/:id').get(foodController.getOneFood).patch(foodController.updateOne);
router.use('/:foodId/reviews', ReveiwRouter);

export default router;
