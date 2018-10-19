const request = require('request-promise')
const cheerio = require('cheerio')
const moment = require('moment')

async function getRateInfo()
{
  const TODAY_DATE = moment().format('YYYY-MM-DD')
  const MASTERCARD_USD_TO_UAH_URL = 'https://ferates.com/ajax/cards_table/mastercard/uah'
  const URI = `${MASTERCARD_USD_TO_UAH_URL}/${TODAY_DATE}`

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

  try {
    let $ = await request(options);

    return getParsedRateInfo($($('#usd')[0]))
  } catch (err) {
    throw err
  }
}

function getParsedRateInfo(jqueryRow)
{
  const result = {
    bid: jqueryRow.find('td.column_4 > .value').text().trim(),
    ask: jqueryRow.find('td.column_5 > .value').text().trim()
  }

  return result
}

module.exports.getRateInfo = getRateInfo

