import { Router } from 'express';
import FoodController from '../controllers/FoodController';

const router: Router = Router();
const foodController = new FoodController();

router.route('/').get(foodController.getAllFoods).post(foodController.createFood);
router.route('/:id').patch(foodController.updateOne);

router.route('/types').get(foodController.getFoodTypes);
export default router;
