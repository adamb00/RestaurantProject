import { Router } from 'express';
import ReviewController from '../controllers/ReviewController';
import authenticateUser from '../middlewares/authenticateUser';

const reviewController = new ReviewController();

const router: Router = Router({ mergeParams: true });

router.use(authenticateUser);

router
   .route('/')
   .get(reviewController.getAllReview)
   .post(reviewController.setUserAndFood, reviewController.createReview);

router
   .route('/:id')
   .get(reviewController.getOneReview)
   .patch(reviewController.updateOne)
   .delete(reviewController.deleteOne);

export default router;
