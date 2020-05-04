import { Schema, model } from 'mongoose';
import type { IGhContact, IGhContactModel } from './ghContact.interface';

const GhContactSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true
  },
  name: String,
  avatarUrl: String,
  bio: String,
  location: String,
  email: String
}, { timestamps: true })

const GhContactModel = model<IGhContact, IGhContactModel>('GhContact', GhContactSchema);
export { GhContactModel };