import { Module } from '@nestjs/common';
import { AuthController, AuthService } from '.';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  imports: [DatabaseModule, UsersModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
