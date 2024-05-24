import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  kakaoId: Number,
  name: String,
  email: String,
  auth: {
    owner: [String],
    editor: [String],
    viewer: [String],
  },
});
