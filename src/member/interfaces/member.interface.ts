import { Document } from 'mongoose';

export interface MemberInterface extends Document {
  name: string;
  memberInfo: object;
}
