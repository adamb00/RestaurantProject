import { ObjectId } from 'mongoose';

export default interface IReview {
   review: string;
   rating: number;
   user: ObjectId;
   food: ObjectId;
   createdAt: Date;
}
