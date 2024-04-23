import { Document } from 'mongoose';

export interface Group extends Document {
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
