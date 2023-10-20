import { NextFunction, Request, Response } from 'express';

export const setUser = (req: Request, _res: Response, next: NextFunction) => {
   if (!req.body.user) req.body.user = req.user.id;

   next();
};
