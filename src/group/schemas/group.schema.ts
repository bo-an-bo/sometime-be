import { Schema } from 'mongoose';

export const GroupSchema = new Schema({
  name: String,
  description: String,

  auth: {
    owner: String,
    editors: [String],
    viewers: [String],
  },

  members: { type: [String], default: [] },
  events: { type: [String], default: [] },
});
