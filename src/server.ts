import 'reflect-metadata';
import express from 'express';
import './database';

const app = express();

app.get('/', (req, res) => {
  return res.send('Hello World');
});

app.listen(3000, () => console.log('server started on port 3000'));
