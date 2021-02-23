import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './routes';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Hello World');
});

app.use(router);

app.listen(3000, () => console.log('server started on port 3000'));
