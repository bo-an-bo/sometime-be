import { Document } from 'mongoose';

export interface EventInterface extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  transactionStartDate: Date;
  transactionEndDate: Date;
  fee: number;
  attendees: string[];
}
