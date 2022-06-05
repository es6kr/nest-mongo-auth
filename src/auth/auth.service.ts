import { Injectable } from '@nestjs/common';
import createError from 'http-errors';
import { UsersService } from '../users/users.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(user: LoginDto) {
    return this.validateUser(user?.username, user?.password);
  }

  async register(registerDto: User): Promise<User> {
    const user = await this.usersService.register(registerDto);
    const { username, email } = user;
    return { username, email };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const result = await this.usersService.authenticate(username, password);
    if (result.error) {
      throw new createError.BadRequest(result.error.message);
    }
    return result.user.toObject({ flattenMaps: true });
  }
}
