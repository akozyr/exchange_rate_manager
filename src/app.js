const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.end('hello world')
});

app.listen(8080, () => {
  console.log('App listening on port 8080.');
});
