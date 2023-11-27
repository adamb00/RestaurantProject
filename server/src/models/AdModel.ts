import { Schema, model } from 'mongoose';
import { IAd } from '../interfaces/IAd';

const adSchema: Schema = new Schema<IAd>({
   image: String,
   name: String,
   description: String,
   type: String,
   expirationDate: Date,
});

adSchema.post('save', async function () {
   await Ad.collection.createIndex({ expirationDate: 1 }, { expireAfterSeconds: 20 });
});

const Ad = model<IAd>('Ad', adSchema);

export default Ad;
