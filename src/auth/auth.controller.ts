import { Controller, Post } from '@nestjs/common';
import createError from 'http-errors';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(registerDto: RegisterDto): Promise<User> {
    let { password1: password, password2, ...createUserDto } = registerDto;
    if (password !== password2) {
      throw createError.BadRequest('The password confirmation does not match');
    }
    return this.authService.register({ password, ...createUserDto });
  }
}
