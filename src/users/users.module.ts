import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.proviers';
import { UsersService } from './users.service';

@Module({
  exports: [UsersService],
  imports: [DatabaseModule],
  providers: usersProviders,
})
export class UsersModule {}
