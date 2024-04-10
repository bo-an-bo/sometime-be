import { Document } from 'mongoose';

export interface Member extends Document {
  name: string;
  phoneNumber: string;
}
