export default class AppError extends Error {
   status: string;
   isOperational: boolean;
   code?: number;

   constructor(public message: string, public statusCode: number) {
      super(message);

      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'error' : 'error';
      this.isOperational = true;

      Error.captureStackTrace(this, this.constructor);
   }
}
