import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'MONGODB_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      const configService = new ConfigService();
      const uri = configService.get('MONGODB_URI');
      return mongoose.connect(uri);
    },
  },
];
