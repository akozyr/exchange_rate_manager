const request = require('request-promise')
const cheerio = require('cheerio')

const TODAY_DATE = new Date().toISOString().replace(/T.+/, '')
const URI = `https://ferates.com/ajax/cards_table/mastercard/uah/${TODAY_DATE}`

const options = {
  uri: URI,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  transform: function (body) {
    const htmlBody = JSON.parse(body).table.all

    return cheerio.load(htmlBody)
  }
}

request(options).then($ => {
  console.log(getUsdBidAndAsk($($('#usd')[0])))
}).catch(error => {
  console.log(error);
})

function getUsdBidAndAsk(jqueryRow)
{
  const result = {
    bid: jqueryRow.find('td.column_4 > .value').text().trim(),
    ask: jqueryRow.find('td.column_5 > .value').text().trim()
  }

  return result
}

