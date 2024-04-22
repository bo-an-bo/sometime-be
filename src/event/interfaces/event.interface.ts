import { Document } from 'mongoose';

export interface Event extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  fee: number;
  attendees: string[];
}
