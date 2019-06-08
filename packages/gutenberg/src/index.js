import express from 'express';

const app = express();

app.use('', (req, res) => res.send('banana'));

app.listen(3000, err => {
  if (err) {
    return console.log('error starting app', err);
  }
  return console.log('started app on port', 3000);
});
