import { Test, TestingModule } from '@nestjs/testing';
import { AuthController, AuthService } from '.';
import '../../test/support';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './auth.dto';

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
    return () => {
      service.deleteOne({ username: testUser.username });
      module.close();
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register()', async () => {
    let user = await controller.register(testUser);
    expect(user).toMatchSnapshot('registeredUser');
  });
});
