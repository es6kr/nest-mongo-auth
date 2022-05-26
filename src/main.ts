import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import passport from 'passport';
import { AppModule } from './app.module';

const middlewares = [
  session({
    secret: process.env.SECRET_KEY,
  }),
  passport.initialize(),
  passport.session(),
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(middlewares);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
