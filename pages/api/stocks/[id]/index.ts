import {ALPHAVANTAGEAPI} from '../../../../src/api/secret'
import { authenticated } from '../../../../src/api/authenticated';

export default authenticated(async function getStocks(req,res) {
  var id = req.url.substring(req.url.lastIndexOf('/') + 1,req.url.indexOf('?'));
  var range = req.url.substring(req.url.lastIndexOf('range=') + 6);
  console.log("ID RANGE",id,range)
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${id}&interval=5min&apikey=${ALPHAVANTAGEAPI}`
  switch (range){
    case "week":
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${id}&apikey=${ALPHAVANTAGEAPI}`
      break
    case "month":
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=compact&symbol=${id}&interval=5min&apikey=${ALPHAVANTAGEAPI}`
      break
  }
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) =>{
    return response.json()
  })
  .then(data => {
    res.send(data)
    res.status(201)
  })
})
