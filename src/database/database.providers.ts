import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory(configService: ConfigService): Promise<typeof mongoose> {
      let uri = configService.get('MONGO_URI');
      return mongoose.connect(uri);
    },
  },
];
