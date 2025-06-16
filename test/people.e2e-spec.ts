import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Role } from '../src/users/roles/roles.enum';

describe('PeopleController (e2e)', () => {
  let app: INestApplication<App>;
  let jwt_token: string;

  beforeAll(async () => {
    jest.setTimeout(1000000000)
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();


  });

  it('Register the user', async () => {
    await request(app.getHttpServer())
      .post('/api/register')
      .send({ name: "Mike Ermentraut", email: "finger@gmail.com", password: "Waltuh", role: Role.ADMIN })
      .expect(201)

  });

  it('Login the user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ name: "Mike Ermentraut", password: "Waltuh" })
      .expect(201)
    console.log(response.header)

  });
  // it('Get all people with token', () => {
  //   return request(app.getHttpServer())
  //     .get('/people')
  //     .set('Authorization', `Bearer ${jwt_token}`)
  //     .expect(200)
  // });
  //
  // it('Create new person with token', () => {
  //   return request(app.getHttpServer())
  //     .post('/people')
  //     .send({
  //       name: "Jack",
  //       height: "165",
  //       mass: "200kg",
  //       hair_color: "white",
  //       skin_color: "green",
  //       eye_color: "blue",
  //       birth_year: "1995",
  //       gender: "Undefined",
  //       created: "2025-06-06T14: 45: 35.810Z",
  //       edited: "2025-06-06T14:45:35.810Z"
  //     })
  //     .set('Authorization', `Bearer ${jwt_token}`)
  //     .expect(200)
  // });
  //
  // it('Get a person by id with token', () => {
  //   return request(app.getHttpServer())
  //     .post('/people/2')
  //     .set('Authorization', `Bearer ${jwt_token}`)
  //     .expect(200)
  // });
});
