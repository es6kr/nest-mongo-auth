import { Inject, Injectable } from '@nestjs/common';
import {
  AuthenticateMethod,
  HydratedDocument,
  PassportLocalModel
} from 'mongoose';
import 'passport-local-mongoose';
import { CreateUserDto, FindUserDto } from './users.dto';

@Injectable()
export class UsersService<T = HydratedDocument<User>> {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: PassportLocalModel<T>,
  ) {}

  get authenticate(): AuthenticateMethod<T> {
    return this.userModel.authenticate();
  }

  async deleteOne(filter: FindUserDto): Promise<DeleteResult> {
    return this.userModel.deleteOne(filter);
  }

  async register(createUserDto: CreateUserDto): Promise<T> {
    return this.userModel.register(
      new this.userModel(createUserDto),
      createUserDto.password,
    );
  }

  async findOne(filter: FindUserDto): Promise<T | undefined> {
    return this.userModel.findOne(filter);
  }
}
