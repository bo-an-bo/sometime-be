import { Schema } from 'mongoose';

export const MemberSchema = new Schema({
  name: String,
  memberInfo: Object,
});
