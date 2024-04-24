import { Schema } from 'mongoose';

export const TransactionSchema = new Schema({
  metadata: {
    groupId: String,
    transactionType: String,
    amount: Number,
  },
  timestamp: Date,
});
