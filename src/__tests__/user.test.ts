import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'luciano@gmail.com',
      name: 'Luciano',
    });

    expect(response.status).toEqual(201);
  });

  it('throws an error if the user already exist', async () => {
    const response = await request(app).post('/users').send({
      email: 'luciano@gmail.com',
      name: 'Luciano',
    });

    expect(response.status).toEqual(400);
  });
});
