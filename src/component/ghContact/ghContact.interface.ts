import type { Document, Model } from 'mongoose';
import type { ObjectId } from 'mongodb';
 
export interface ICreatObj {
  username: string;
  bio?: string;
  name?: string;
  email?: string;
  location?: string;
  avatarUrl?: string;
}

export interface IEditBody {
  id: string;
  bio?: string;
  name?: string;
  email?: string;
  location?: string;
  avatarUrl?: string;
}

export type ObjectIdConstructor = new (str: string) => ObjectId;

export interface IGhContact extends Document {
  username: string;
  name?: string,
  avatarUrl?: string,
  bio?: string,
  location?: string,
  email?: string
  createdAt?: Date,
  updatedAt?: Date
}

export type IGhContactModel = Model<IGhContact>;

