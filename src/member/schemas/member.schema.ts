import * as mongoose from 'mongoose';

export const MemberSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});
