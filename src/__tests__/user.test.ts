import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  it('create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'luciano@gmail.com',
      name: 'Luciano',
    });

    expect(response.status).toEqual(201);
  });
});
