var url = require("url")
import { MongoClient } from "mongodb"

const DAY = 86400000

export default async function getTrendingNews() {
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  const db = client.db()
  const otherCollection = db.collection("other")
  const trending = await otherCollection.findOne({ key: "trending-news" })
  var a: any = new Date()
  // update trending stocks if it has been more than 24 hours since last update
  if (a - trending.data.updated > DAY) {
    fetch(`https://yfapi.net/v1/finance/trending/us`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.YAHOOFINANCE_API,
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const tickers = data.finance.result[0].quotes.map((item) => {
          return item.symbol
        })
        fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${tickers.join(",")}`, { method: "GET" })
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            if (data.quoteResponse.error) throw data.quoteResponse.error
            var resData = data.quoteResponse.result.map((item) => {
              return {
                symbol: item.symbol,
                name: item.shortName,
                price: item.regularMarketPrice,
                change: item.regularMarketChangePercent,
                dayRange: item.regularMarketDayRange,
              }
            })
            const update1 = {
              $set: {
                key: "trending-stocks",
                data: {
                  updated: new Date(),
                  data: resData,
                },
              },
            }
            otherCollection.updateOne({ key: "trending-stocks" }, update1)
            return resData.stocks
          })
      })
    //     })
  }
  return trending.data.data
}
