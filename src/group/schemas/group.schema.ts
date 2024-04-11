import { Schema } from 'mongoose';

export const GroupSchema = new Schema({
  name: String,
  description: String,
  manager: String,
  subManagers: {
    type: [
      {
        user: String,
        authorities: [String],
      },
    ],
    default: [],
  },
  members: { type: [String], default: [] },
});
