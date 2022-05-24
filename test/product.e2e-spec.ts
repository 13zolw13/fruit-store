import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { AppModule } from '../src/modules/app/app.module';
import request = require('supertest');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const gql = '/graphql';

  beforeAll(async () => {
    mongoose.connection.dropDatabase();
  });
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

  afterEach(() => {
    mongoose.connection.dropDatabase();
  });

  describe('Create Product', () => {
    it('should return created product', async () => {
      const createProductQueryString = `mutation{ createProduct(createProductInput:{ name:"bob" }){ name id }}`;
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: createProductQueryString,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createProduct.name).toBe('bob');
          expect(res.body.data.createProduct.id).toBeDefined();
        });
    });
  });

  describe('Find all products', () => {
    it('should return list of products', async () => {
      const findProductQueryString = `query{ products{ name, price}}`;
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: findProductQueryString,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.products).toBeDefined();
          expect(res.body.data.products[0].name).toBe('bob');
        });
    });
  });

  describe('Find one product by id', () => {
    it('should return one product', async () => {
      let id: string;
      const createProductQueryString = `mutation{ createProduct(createProductInput:{ name:"bob" }){ name id}}`;
      await request(app.getHttpServer())
        .post(gql)
        .send({
          query: createProductQueryString,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createProduct.name).toBe('bob');
          expect(res.body.data.createProduct.id).toBeDefined();
          id = res.body.data.createProduct.id;
        });
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: findProductByIdQueryString(id),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeDefined();
        });
    });
  });

  describe('Update product', () => {
    it('should  update product details', async () => {
      let id: string;
      const createProductQueryString = `mutation{ createProduct(createProductInput:{ name:"bob" }){ name id}}`;

      await request(app.getHttpServer())
        .post(gql)
        .send({
          query: createProductQueryString,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createProduct.name).toBe('bob');
          expect(res.body.data.createProduct.id).toBeDefined();
          id = res.body.data.createProduct.id;
        });

      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: updateProductQueryString(id),
        });
      expect(response.body.data.updateProduct.name).toBe('banana');
    });
  });

  describe('Remove product', () => {
    it('should  remove product', async () => {
      let id: string;
      await request(app.getHttpServer())
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
          id = res.body.data.createProduct.id;
        });

      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation{
  removeProduct(id:"${id}"){
    id
  }
}`,
        });
      expect(response.statusCode).toBe(200);
    });
  });
});
function updateProductQueryString(id: string) {
  return `mutation{
  	updateProduct(updateProductInput:{ id:"${id}" name:"banana" supplier:"kazistan"})
      { name id supplier} }`;
}

function findProductByIdQueryString(id: string) {
  return `{
 OneProduct(id:"${id}"){  name}}`;
}
