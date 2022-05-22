import { Test, TestingModule } from '@nestjs/testing';
import '../../test/support';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  register(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    return () => module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
