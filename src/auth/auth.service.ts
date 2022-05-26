import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: User): Promise<User> {
    let user = await this.usersService.register(registerDto);
    let { username, email } = user;
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
