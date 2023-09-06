import { Model, Schema, model } from 'mongoose';
import IFood from '../interfaces/IFood';
import { NextFunction } from 'express';
import slugify from 'slugify';

const foodSchema: Schema = new Schema<IFood>({
   name: {
      type: String,
      required: [true, 'A food must have a name.'],
      unique: true,
      trim: true,
      minlength: [5, 'A food name must have more or equal then 5 characters'],
      maxlength: [40, 'A food name must have more or equal then 40 characters'],
   },
   price: {
      type: Number,
      required: [true, 'A food must have a price.'],
   },
   ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be belove 5.0'],
      set: (val: number) => Math.round(val * 10) / 10,
   },
   ratingsQuantity: {
      type: Number,
      default: 0,
   },
   description: {
      type: String,
      required: [true, 'A food must have a description.'],
      minlength: [5, 'Description must be more or equal than 5 characters.'],
   },
   type: {
      type: String,
      required: [true, 'A food must have a type'],
      enum: ['pizza', 'soup', 'starter', 'dessert', 'main course', 'salad', 'one plater', 'side', 'sauce'],
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   meatType: {
      type: String,
      enum: [null, 'beef', 'poultry', 'pork', 'fish', 'speciality', 'plate', 'pasta'],
      default: null,
   },
   isAvailable: {
      type: Boolean,
      default: true,
   },
   isVegetarian: {
      type: Boolean,
      default: false,
   },
   needSide: {
      type: Boolean,
      default: false,
   },
   glutenFree: {
      type: Boolean,
   },
   lactoseFree: {
      type: Boolean,
   },
   canMakeGlutenFree: {
      type: Boolean,
   },
   canMakeLactoseFree: {
      type: Boolean,
   },
});

foodSchema.pre('save', function (next) {
   this.slug = slugify(this.name, { lower: true });
   next();
});

foodSchema.pre('find', function (next) {
   this.select('-__v');
   next();
});

const Food: Model<IFood> = model<IFood>('Food', foodSchema);

export default Food;
