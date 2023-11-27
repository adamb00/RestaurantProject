import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import catchAsync from '../utils/catchAsync';
import path from 'path';
import sharp from 'sharp';

const multerStore = multer.memoryStorage();

const filter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
   req.file = file;

   if (file.mimetype.startsWith('image')) {
      cb(null, true);
   } else {
      cb(null, false);
   }
};

export const resizeImage = (resize: number) =>
   catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) return next();

      req.file.filename = `${req.body.name.toLowerCase().replaceAll(' ', '_')}.png`;

      const outputPath = path.join(__dirname, '../../../mobile/assets', req.file.filename);

      await sharp(req.file.buffer)
         .rotate()
         .resize({
            width: resize,
            height: resize,
            fit: 'inside',
         })
         .withMetadata()
         .toFormat('png')
         .jpeg({ quality: 90 })
         .toFile(outputPath);

      req.body.image = req.file.filename;

      next();
   });

export const upload = multer({
   storage: multerStore,
   fileFilter: filter,
});
