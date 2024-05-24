import { Document } from 'mongoose';

export interface GroupInterface extends Document {
  name: string;
  description: string;

  auth: {
    owner: string;
    editors: string[];
    viewers: string[];
  };

  members: any[];
  events: any[];
}
