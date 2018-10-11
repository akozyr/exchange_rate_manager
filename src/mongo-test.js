const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://mongo:27017'
const dbName = 'exchange_rate_db'

const client = new MongoClient(url, { useNewUrlParser: true })

client.connect(function (error) {
  console.log('Connected successfully to the mongodb server.')

  const db = client.db(dbName)
  const ratesCollection = db.collection('rates')

  let added = new Date()
  added.setDate(added.getDate() - 2)
  ratesCollection.insertOne({ bid: 26.08, ask: 26.20, added: added }, function (err, result) {
    ratesCollection.find({}).toArray(function(err, docs) {
      console.log(docs)

      // ratesCollection.deleteMany({})

      client.close()
    })
  })
})

