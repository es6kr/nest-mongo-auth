export class LoginDto {
  readonly username: string;
  readonly password: string;
}

export class RegisterDto {
  readonly username: string;
  readonly email: string;
  readonly password1: string;
  readonly password2: string;
}
