import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
});
