import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import createError from 'http-errors';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post()
  register(registerDto: RegisterDto): Promise<User> {
    const { password1: password, password2, ...createUserDto } = registerDto;
    if (password !== password2) {
      throw new createError.BadRequest(
        'The password confirmation does not match',
      );
    }
    return this.authService.register({ password, ...createUserDto });
  }
}
