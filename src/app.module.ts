import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';

@Module({
  /* prettier-ignore */
  imports: [
    RouterModule.register([{
      path: 'auth',
      module: AuthModule,
    }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
