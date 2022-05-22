export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly email?: string;
}

export class FindUserDto {
  readonly id?: string;
  readonly username?: string;
  readonly password?: string;
  readonly email?: string;
}
