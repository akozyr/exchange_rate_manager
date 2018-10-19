module.exports = {
  SENDGRID_APIKEY: process.env.SENDGRID_APIKEY || 'test',
  EMAIL_TO: 'anton.kozyr.dev@gmail.com',
  EMAIL_FROM: 'support@exchange.rate',
  EMAIL_SUBJECT: 'Exchange rate',
  MONGO_URL: process.env.MONGO_URL || 'url',
  MONGO_DB: process.env.MONGO_DB || 'db_name',
  MONGO_USER: process.env.MONGO_USER || 'user',
  MONGO_PASS: process.env.MONGO_PASS || 'pass',
  PORT: process.env.PORT || 3000
}
