import { Query, Document, Types } from 'mongoose';
import { ParsedQs } from 'qs';
import IReservation from '../interfaces/IReservation';

export default class APIFeatures {
   constructor(
      public query: Query<
         (Document<unknown, {}, IReservation> & IReservation & { _id: Types.ObjectId })[],
         Document<unknown, {}, IReservation> & IReservation & { _id: Types.ObjectId },
         {},
         IReservation,
         'find'
      >,
      public queryString: ParsedQs
   ) {}

   public filter() {
      const queryObject = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObject[el]);

      let queryStr = JSON.stringify(queryObject);

      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      this.query = this.query.find(JSON.parse(queryStr));

      return this;
   }

   public sort() {
      if (this.queryString.sort) {
         const sortBy = this.queryString.sort.toString().split(',').join(' ');
         this.query = this.query.sort(sortBy);
      } else {
         this.query = this.query.sort('-createdAt');
      }
      return this;
   }

   public limitFields() {
      if (this.queryString.fields) {
         const fields = this.queryString.fields.toString().split(',').join(' ');
         this.query = this.query.select(fields);
      } else {
         this.query = this.query.select('-__v');
      }
      return this;
   }

   public paginate() {
      const page = parseInt(this.queryString.page as string) || 1;
      const limit = parseInt(this.queryString.limit as string) || 100;
      const skip = (page - 1) * limit;

      this.query = this.query.skip(skip).limit(limit);

      return this;
   }
}
