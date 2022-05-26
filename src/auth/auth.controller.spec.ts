import { Test, TestingModule } from '@nestjs/testing';
import { AuthController, AuthService } from '.';
import '../../test/support';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './auth.dto';
import createError = require('http-errors');

const testUser: RegisterDto = {
  username: 'authtest',
  email: 'auth@test.com',
  password1: 'P@ssw0rd',
  password2: 'P@ssw0rd',
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: UsersService;

  register(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [UsersModule],
      providers: [AuthService],
    }).compile();

    controller = module.get(AuthController);
    service = module.get(UsersService);
    return async () => {
      await service.deleteOne({ username: testUser.username });
      await module.close();
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register()', async () => {
    let user = await controller.register(testUser);
    expect(user.username).toEqual(testUser.username);
    expect(user.email).toEqual(testUser.email);

    const failingAsyncTest = async () =>
      await controller.register({ ...testUser, password2: 'test' });
    await expect(failingAsyncTest()).rejects.toThrow(createError.HttpError);
  });
});
