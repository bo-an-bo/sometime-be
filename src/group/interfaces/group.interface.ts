import { Document } from 'mongoose';

export interface GroupInterface extends Document {
  name: string;
  description: string;
  manager: string;
  subManagers: [
    {
      user: string;
      authorities: string[];
    },
  ];
  members: any[];
  events: any[];
}
