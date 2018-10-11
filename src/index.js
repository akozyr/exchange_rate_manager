const scraper = require('./scraper')
const rateRepository = require('./rate-repository')
const rateEmailSender = require('./rate-email-sender')

scraper.getUsdBidAndAskRate().then(syncedRate => {
  rateRepository.findLast().then(storedRate => {
    let rateChangingType = 0
    if (storedRate.bid < syncedRate.bid) {
      rateChangingType = 1
    }

    rateEmailSender.send(syncedRate, rateChangingType)
  }).catch(err => {
    console.log(err)
  })

  rateRepository.store(syncedRate).catch(err => {
    console.log(err)
  })
}).catch(err => {
  console.log(err)
})
