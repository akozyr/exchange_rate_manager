const CronJob = require('cron').CronJob
const http = require('http')
const rateExchangeScraperJob = require('./rate-exchange-scraper-job')
const config = require('./config')

const job = new CronJob({
  cronTime: '00 30 21 * * *', // UTC timezone
  onTick () {
    console.log('Job is running...')
    rateExchangeScraperJob()
  },
  start: true
})

const server = http.createServer(function (request, response) {
  response.end('Exchange Rate Manager is running...')
})

server.listen(config.PORT, function (error) {
  if (error) {
    return console.log(err)
  }

  console.log(`Server is listening on ${config.PORT}.`)
})
