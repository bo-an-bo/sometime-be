import { Schema } from 'mongoose';

export const GroupSchema = new Schema({
  name: String,
  description: String,

  owner: String,
  editors: { type: [String], default: [] },
  viewers: { type: [String], default: [] },

  members: { type: [String], default: [] },
  events: { type: [String], default: [] },
});
