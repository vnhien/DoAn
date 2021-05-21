const express = require('express');
const cors = require('cors')
const app = express();
const search = require('./search.js')

app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.use('/search', search)
app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

