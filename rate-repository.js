const config = require('./config')
const mongodb = require('mongodb')

function client() {
  return new mongodb.MongoClient(config.MONGO_URL, { useNewUrlParser: true })
}

module.exports.findLast = function () {
  return new Promise((resolve, reject) => {
    client().connect(function (err, client) {
      if (err) reject(err)

      const db = client.db(config.MONGO_DB)

      const where = { added: { $lte: new Date() } }
      db.collection('rates').findOne(where, function (err, result) {
        if (err) reject(err)

        client.close()

        resolve(result)
      })
    })
  })
}

module.exports.updateOrInsert = function (rate) {
  return new Promise((resolve, reject) => {
    client().connect(function (err, client) {
      if (err) reject(err)

      const db = client.db(config.MONGO_DB)

      const filter = { added: { $lte: new Date() } }
      const rateModel = {
        bid: rate.bid,
        ask: rate.ask,
        added: new Date()
      }
      db.collection('rates').updateOne(filter, { $set: rateModel }, { upsert: true }, function (err, result) {
        if (err) reject(err)

        client.close()

        resolve()
      })
    })
  })
}
