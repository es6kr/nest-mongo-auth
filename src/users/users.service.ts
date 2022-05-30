import { Inject, Injectable } from '@nestjs/common';
import {
  AuthenticateMethod,
  HydratedDocument,
  PassportLocalModel,
} from 'mongoose';
import 'passport-local-mongoose';

@Injectable()
export class UsersService<T = HydratedDocument<User>> {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: PassportLocalModel<T>,
  ) {}

  get authenticate(): AuthenticateMethod<T> {
    return this.userModel.authenticate();
  }

  async deleteOne(filter: User): Promise<DeleteResult> {
    return this.userModel.deleteOne(filter);
  }

  async register(createUserDto: User): Promise<T> {
    return this.userModel.register(
      new this.userModel(createUserDto),
      createUserDto.password,
    );
  }

  async findOne(filter: User): Promise<T | undefined> {
    return this.userModel.findOne(filter);
  }
}
