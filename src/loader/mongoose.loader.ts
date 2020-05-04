import mongoose from 'mongoose';
import type { Db } from 'mongodb';
import { DATABASE } from 'src/config';

export const mongooseLoader = async (): Promise<Db> => {

  const connection = await mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection.on(
    'error', console.error.bind(console, 'connection error:')
  );

  return connection.connection.db;
}