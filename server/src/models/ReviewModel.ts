import { Model, Query, Schema, model, Document, CallbackError } from 'mongoose';
import IReview from '../interfaces/IReview';
import { Request } from 'express';
import Food from './FoodModel';
import IFood from '../interfaces/IFood';
import IUser from '../interfaces/IUser';

interface ReviewDocument extends Document {
   review: string;
   rating: number;
   createdAt: Date;
   food: IFood;
   user: IUser;
}

interface ReviewModel extends Model<ReviewDocument> {
   calcAverageRatings(food: IFood): Promise<void>;
}

interface CustomQuery extends Query<ReviewDocument | null, ReviewDocument> {
   r?: ReviewDocument | null;
}

const reviewSchema = new Schema<ReviewDocument, ReviewModel>({
   review: {
      type: String,
      required: [true, 'Review must contain any description.'],
      maxlength: [120, 'Max lenght can be only 120 words.'],
   },
   rating: {
      type: Number,
      required: [true, 'Review must contain any rating'],
      min: 1,
      max: 5,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   food: {
      type: Schema.Types.ObjectId,
      // ref: 'Food',
      required: [true, 'Review must belong to a food.'],
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
   },
});

reviewSchema.pre<Query<IReview, IReview>>(/^find/, function (next): void {
   this.select('-__v');
   this.populate({
      path: 'user',
      select: 'fullName email',
   }).populate({
      path: 'food',
      select: 'name',
   });
   next();
});

reviewSchema.statics.calcAverageRatings = async function (food: IFood) {
   const stats = await this.aggregate([
      {
         $match: { food: food._id },
      },
      {
         $group: {
            _id: '$food',
            nRatings: { $sum: 1 },
            avgRating: { $avg: '$rating' },
         },
      },
   ]);

   console.log('Aggregation result:', stats);

   if (stats.length > 0) {
      const { nRatings, avgRating } = stats[0];
      await Food.findByIdAndUpdate(food, {
         ratingsQuantity: nRatings,
         ratingsAverage: avgRating,
      });
   } else {
      await Food.findByIdAndUpdate(food, {
         ratingsQuantity: 0,
         ratingsAverage: 4.5,
      });
   }
};

reviewSchema.index({ food: 1, user: 1 }, { unique: true });

reviewSchema.post('save', function () {
   (this.constructor as ReviewModel).calcAverageRatings(this.food);
   console.log(this);
});

reviewSchema.pre<CustomQuery>(/^findOneAnd/, async function (next) {
   console.log('Stepped into pre hook');
   try {
      const filter = this.getFilter();
      const doc = await this.model.findOne(filter).exec();
      this.r = doc;
      console.log(this.r);
      next();
   } catch (error) {
      console.error('Error in findOne():', error);
      next(error as CallbackError);
   }
});

reviewSchema.post<CustomQuery>(/^findOneAnd/, async function () {
   console.log('Stepped into post hook');
   if (this.r) {
      (this.model as ReviewModel).calcAverageRatings(this.r.food);
   }
});

const Review = model<ReviewDocument, ReviewModel>('Review', reviewSchema);

export default Review;