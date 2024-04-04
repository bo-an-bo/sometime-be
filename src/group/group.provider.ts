import { Connection } from 'mongoose';
import { GroupSchema } from './schemas/group.schema';

export const groupProvider = [
  {
    provide: 'GROUP_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Group', GroupSchema),
    inject: ['MONGODB_CONNECTION'],
  },
];
