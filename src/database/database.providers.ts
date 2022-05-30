import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory(configService: ConfigService): Promise<typeof mongoose> {
      const uri = configService.get('MONGO_URI');
      return mongoose.connect(uri);
    },
  },
];
