import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import createError from 'http-errors';
import { AuthController, AuthService } from '.';
import '../../test/support';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './auth.dto';

const testLogin: LoginDto = {
  username: 'authtest',
  password: 'P@ssw0rd',
};

const testUser: RegisterDto = {
  ...testLogin,
  email: 'auth@test.com',
  password1: testLogin.password,
  password2: testLogin.password,
};

describe('AuthController', () => {
  let app: INestApplication;
  let controller: AuthController;
  let service: UsersService;

  register(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [UsersModule],
      providers: [AuthService],
    }).compile();

    app = module.createNestApplication();
    controller = module.get(AuthController);
    service = module.get(UsersService);
    return async () => {
      await service.deleteOne({ username: testUser.username });
      await module.close();
      await app.close();
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register()', async () => {
    const user = await controller.register(testUser);
    expect(user.username).toEqual(testUser.username);
    expect(user.email).toEqual(testUser.email);

    const failingAsyncTest = async () =>
      await controller.register({ ...testUser, password2: 'test' });
    await expect(failingAsyncTest()).rejects.toThrow(createError.HttpError);
  });

  it('login()', async () => {
    const user = await controller.login(testLogin);
    expect(user.username).toEqual(testLogin.username);
  });
  it('login() fail', async () => {
    const failingAsyncTest = async () =>
      await controller.login({ ...testLogin, password: 'wrong' });
    await expect(failingAsyncTest()).rejects.toThrow(createError.HttpError);
  });
});
