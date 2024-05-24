import { Document } from 'mongoose';

export interface GroupInterface extends Document {
  name: string;
  description: string;

  owner: any;
  editors: any[];
  viewers: any[];

  members: any[];
  events: any[];
}
