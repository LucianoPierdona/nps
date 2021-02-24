import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {
  let connection: Connection;

  beforeEach(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'A new survey has been created',
      description: 'ta olhando o que?',
    });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('id');
  });

  it('return the survey created', async () => {
    await request(app).post('/surveys').send({
      title: 'A new survey has been created',
      description: 'ta olhando o que?',
    });
    const response = await request(app).get('/surveys');

    expect(response.body.length).toEqual(1);
  });
});
