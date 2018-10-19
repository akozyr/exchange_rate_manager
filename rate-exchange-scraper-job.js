const scraper = require('./scraper')
const rateRepository = require('./rate-repository')
const rateEmailSender = require('./rate-email-sender')

module.exports = function () {
  scraper.getRateInfo().then(syncedRateInfo => {
    rateRepository.findLast().then(storedRateInfo => {
      if (!storedRateInfo) {
        return
      }

      let rateChangingType = 0
      if (storedRateInfo.bid < syncedRateInfo.bid) {
        rateChangingType = 1
      }

      rateEmailSender.send(syncedRateInfo, rateChangingType)
    }).catch(err => {
      console.log(err)
    })

    rateRepository.updateOrInsert(syncedRateInfo).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
}
