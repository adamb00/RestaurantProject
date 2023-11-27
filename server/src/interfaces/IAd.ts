import { Document } from 'mongoose';

export interface IAd extends Document {
   image: string;
   name: string;
   description: string;
   type: string;
   expirationDate: Date;
}
