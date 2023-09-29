import { Request, Response, NextFunction } from 'express';

export default (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(err => {
         console.error(err); // Log the error
         next(err); // Pass the error to the next error handler
      });
      // fn(req, res, next).catch(err => {
      //    // Send a JSON response with the error
      //    res.status(err.statusCode || 500).json({
      //       status: 'error',
      //       message: err.message,
      //    });
      // });
   };
};
