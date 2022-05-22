import { Inject, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Mongoose } from 'mongoose';
import { databaseProviders } from './database.providers';

@Module({
  exports: databaseProviders,
  imports: [ConfigModule.forRoot()],
  providers: databaseProviders,
})
export class DatabaseModule {
  constructor(@Inject('DATABASE_CONNECTION') private mongoose: Mongoose) {}

  onApplicationShutdown() {
    this.mongoose.disconnect();
  }
}
