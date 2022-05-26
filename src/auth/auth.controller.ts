import { Controller, Post } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import createError = require('http-errors');

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(registerDto: RegisterDto): Promise<User> {
    let { password1: password, password2, ...createUserDto } = registerDto;
    if (password !== password2) {
      throw new createError.BadRequest(
        'The password confirmation does not match',
      );
    }
    return this.authService.register({ password, ...createUserDto });
  }
}
