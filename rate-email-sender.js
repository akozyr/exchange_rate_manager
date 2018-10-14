const config = require('./config')
const mail = require('@sendgrid/mail');
mail.setApiKey(config.SENDGRID_APIKEY);

module.exports.send = function (syncedRate, type) {
  let typeSymbol = '\u2193'
  if (type == 1) {
    typeSymbol = '\u2191'
  }

  const msg = {
    to: config.EMAIL_TO,
    from: config.EMAIL_FROM,
    subject: `${config.EMAIL_SUBJECT} ${typeSymbol}`,
    text: `Bid: ${syncedRate.bid} Ask: ${syncedRate.ask}`,
  };

  mail.send(msg);
}
