import { CallbackError, InferSchemaType, Schema, model } from 'mongoose';
import IUser from '../interfaces/IUser';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { addressSchema } from './AddressModel';

const userSchema: Schema = new Schema<IUser>({
   fullName: {
      type: String,
      required: [true, 'Please, provide us your full name.'],
   },
   email: {
      unique: true,
      lowercase: true,
      type: String,
      required: [true, 'Please, provide us, your email address.'],
      validate: [validator.isEmail, 'Please, provide a valid email address.'],
   },
   role: {
      type: String,
      default: 'User',
   },
   password: {
      type: String,
      minlength: 8,
      select: false,
      required: [true, 'Please, provide a password.'],
   },
   passwordAgain: {
      type: String,
      required: [true, 'Please, confirm your password.'],
      validate: {
         validator: function (this: UserType, el: string): boolean {
            return el === this.password;
         },
         message: 'Passwords are not the same.',
      },
   },
   passwordChangedAt: Date,
   passwordResetToken: String,
   passwordResetExpires: Date,
   phone: {
      type: Number,
      required: [true, 'Please, provide us your phone number.'],
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   address: { type: addressSchema },
});

userSchema.pre<UserType>('save', async function (this: UserType, next: (err?: CallbackError) => void): Promise<void> {
   if (!this.isModified('password')) return next();

   this.password = await bcrypt.hash(this.password, 12);

   this.passwordAgain = undefined;
   next();
});

const User = model<UserType>('User', userSchema);
export type UserType = InferSchemaType<typeof userSchema>;
export default User;
