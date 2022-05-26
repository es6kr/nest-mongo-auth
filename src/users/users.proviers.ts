import { Mongoose, Schema } from 'mongoose';
import { UsersService } from './users.service';
import passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema<User>({
  email: String,
});

UserSchema.plugin(passportLocalMongoose, {
  selectFields: ['email', 'username'],
  usernameQueryFields: ['email', 'username'],
});

export const usersProviders = [
  UsersService,
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
