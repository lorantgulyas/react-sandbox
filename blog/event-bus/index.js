const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  // posts
  axios.post('http://localhost:4000/events', event);
  // comments
  axios.post('http://localhost:4001/events', event);
  // query service
  axios.post('http://localhost:4002/events', event);

  res.send({ status: 'OK' })
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
