import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'MONGODB_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      const configService = new ConfigService();
      const uri = configService.get<string>('MONGODB_URI');
      const dbName = configService.get<string>('MONGODB_DB_NAME');

      return mongoose.connect(uri, {
        dbName,
      });
    },
  },
];
