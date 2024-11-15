import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
const MONGODB_URI = process.env.MONGODB_URI!;

const dbName = () => {
  return process.env.NODE_ENV === 'production' ? 'help-seeker' : 'help-seeker-develop';
};

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: dbName() });
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;
