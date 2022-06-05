import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginDto } from 'src/auth/auth.dto';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import './support';

const testLogin: LoginDto = {
  username: 'e2etest',
  password: 'P@ssw0rd',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  register(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    return async () => await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/login (POST) fail', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...testLogin, password: 'wrong' })
      .expect(400);
  });
});
