import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  kakaoId: Number,
  name: String,
  email: String,
});
