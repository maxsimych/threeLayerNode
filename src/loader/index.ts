import { expressLoader } from './express.loader';
import { mongooseLoader } from './mongoose.loader';
import type { Application } from 'express';

export const loader = async (app: Application): Promise<void> => {
  await mongooseLoader();
  await expressLoader(app);
}