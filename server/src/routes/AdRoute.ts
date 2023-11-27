import { Router } from 'express';
import AdController from '../controllers/AdController';
import { resizeImage } from '../middlewares/uploadPhoto';

const router: Router = Router();
const adController = new AdController();

router.route('/').get(adController.getAd).post(adController.uploadImage, resizeImage(1000), adController.createAd);

export default router;
