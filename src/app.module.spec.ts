import { Test, TestingModule } from '@nestjs/testing';
import '../test/support';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

describe('AppModule', () => {
  let appModule: AppModule;
  let usersModule: UsersModule;
  buildModule(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
      providers: [AppService],
    }).compile();

    appModule = app.get(AppModule);
    usersModule = app.get(UsersModule);
    return app;
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
    expect(usersModule).toBeDefined();
  });
});
