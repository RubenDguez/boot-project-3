import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import type {CharityDocument} from './charity.js';
import CharitySchema from './charity.js';
import EventSchema from './event.js';

export interface UserDocument extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  charities:  CharityDocument[];
  events: typeof EventSchema[];
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    charities: [
      CharitySchema
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<UserDocument>('User', userSchema);

export default User;
