const express = require('express');
const app = express();

app.get('/', function(req, res) {
  const scraper = require('./scraper')

  scraper.getUsdBidAndAskRate().then(data => {
    res.send(data);
  }).catch(err => {
    console.log(err)
    res.status(500).send('Something went wrong.')
  })
});

app.listen(8080, function () {
  console.log('App listening on port 8080.');
});
