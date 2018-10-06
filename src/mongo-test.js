const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://mongo:27017'
const dbName = 'exchange_rate_db'

const client = new MongoClient(url, { useNewUrlParser: true })

client.connect(function (error) {
  console.log('Connected successfully to the mongodb server.')

  const db = client.db(dbName)

  db.collection('rates').insertOne({ bid: 28.08, ask: 28.20, added: new Date() }, function (err, result) {
    db.collection('rates').find({}).toArray(function(err, docs) {
      console.log(docs)

      db.collection('rates').deleteMany({})

      client.close()
    })
  })
})

