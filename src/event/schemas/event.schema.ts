import { Schema } from 'mongoose';

export const EventSchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  transactionStartDate: Date,
  transactionEndDate: Date,
  fee: Number,
  attendees: { type: [String], default: [] },
});
