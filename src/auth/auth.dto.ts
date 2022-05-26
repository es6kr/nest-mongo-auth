import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}

export class RegisterDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly password1: string;
  @IsString()
  readonly password2: string;
}
