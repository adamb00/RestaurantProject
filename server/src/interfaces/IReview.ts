import { Model, ObjectId, Query, Document } from 'mongoose';

export default interface IReview extends Document {
   review: string;
   rating: number;
   user: ObjectId;
   food: ObjectId;
   createdAt: Date;
}

export interface ReviewModel extends Model<IReview> {
   calcAverageRatings(food: ObjectId): Promise<void>;
}

export interface CustomQuery extends Query<IReview | null, IReview> {
   r?: IReview | null;
}
