import { Injectable } from '@nestjs/common';
import createError from 'http-errors';
import { UsersService } from '../users/users.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(user: LoginDto) {
    const result = await this.usersService.authenticate(
      user.username,
      user.password,
    );
    if (result.error) {
      throw new createError.BadRequest(result.error.message);
    }
    return result.user.toObject();
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
    const { user } = await this.usersService.authenticate(username, password);
    return user.toObject({ flattenMaps: true });
  }
}
