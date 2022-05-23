import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/modules/app/app.module';
import request = require('supertest');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const gql = '/graphql';
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create Product', () => {
    it('should return created product', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation{
  	createProduct(createProductInput:{
      name:"bob"
    }){
    name
    id
  }
}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createProduct.name).toBe('bob');
          expect(res.body.data.createProduct.id).toBeDefined();
        });
    });
  });
});
