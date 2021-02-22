import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.send('Hello World');
});

app.listen(3000, () => console.log('server started on port 3000'));
