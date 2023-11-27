import { upload } from '../middlewares/uploadPhoto';
import Ad from '../models/AdModel';
import * as handler from './../utils/handleControllers';

export default class AdController {
   public uploadImage = upload.single('image');

   public createAd = handler.createOne(Ad);
   public getAd = handler.getAll(Ad);
}
