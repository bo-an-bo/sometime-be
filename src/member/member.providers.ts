import { Connection } from 'mongoose';

import { MemberSchema } from './schemas/member.schema';

export const memberProviders = [
  {
    provide: 'MEMBER_MODEL',
    useFactory: (connection: Connection) => connection.model('Member', MemberSchema),
    inject: ['MONGODB_CONNECTION'],
  },
];
