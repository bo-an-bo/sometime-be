import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  name: String,
  description: String,
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  subManagers: [
    {
      user: String,
      authorities: [String],
    },
  ],
  members: [String],
});
