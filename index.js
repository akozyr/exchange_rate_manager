const scraper = require('./scraper')
const rateRepository = require('./rate-repository')
const rateEmailSender = require('./rate-email-sender')

const CronJob = require('cron').CronJob

const job = new CronJob({
  cronTime: '00 30 19 * * *', // UTC timezone
  onTick () {
    console.log('Job is running...')
    rateExchangeScraperJob()
  },
  start: true
})

function rateExchangeScraperJob() {
  scraper.getUsdBidAndAskRate().then(syncedRate => {
    rateRepository.findLast().then(storedRate => {
      if (!storedRate) {
        return
      }

      let rateChangingType = 0
      if (storedRate.bid < syncedRate.bid) {
        rateChangingType = 1
      }

      rateEmailSender.send(syncedRate, rateChangingType)
    }).catch(err => {
      console.log(err)
    })

    rateRepository.updateOrInsert(syncedRate).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
}
