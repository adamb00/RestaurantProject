import { Router } from 'express';
import FoodController from '../controllers/FoodController';
import ReveiwRouter from './ReviewRoute';
import { resizeImage } from '../middlewares/uploadPhoto';

const router: Router = Router();
const foodController = new FoodController();

router.route('/types').get(foodController.getFoodTypes);

router.route('/top-fav').get(foodController.getFoodStats);

router
   .route('/')
   .get(foodController.getAllFoods)
   .post(foodController.uploadImage, resizeImage(500), foodController.createFood);

router
   .route('/:id')
   .get(foodController.getOneFood)
   .patch(foodController.uploadImage, resizeImage(500), foodController.updateOne);
router.use('/:foodId/reviews', ReveiwRouter);

export default router;
