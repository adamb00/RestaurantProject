import { Schema } from 'mongoose';
import IAddress from '../interfaces/IAddress';

export const addressSchema = new Schema<IAddress>({
   postalCode: { type: String, trim: true, required: [true, 'Please provide us Your address.'] },
   city: { type: String, trim: true, required: [true, 'Please provide us Your address.'] },
   street: { type: String, trim: true, required: [true, 'Please provide us Your address.'] },
   streetNumber: { type: String, trim: true, required: [true, 'Please provide us Your address.'] },
   door: { type: String, trim: true },
   floor: { type: String, trim: true },
   ring: { type: String, trim: true },
});
