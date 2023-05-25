var url = require('url');
import {MongoClient, ServerApiVersion } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import getUser from "./getUser"
import { MONGOUSERNAME,MONGOPASSWORD,YAHOOFINANCEAPI} from './secret';

export default async function getTrendingStocks(
  ) {
    console.log("getTrendingStocks")
    const client = await MongoClient.connect(`mongodb+srv://${MONGOUSERNAME}:${MONGOPASSWORD}@cluster0.yksmj.mongodb.net/StocksApp?retryWrites=true&w=majority`);
    const db = client.db();
    const otherCollection = db.collection('other');
    const trending = await otherCollection.findOne({key:"trending-news"})
    console.log("trending",trending.data.updated)
    var a :any = new Date
    if (a - trending.data.updated > 1800000){ // update trending stocks if it has been more than 24 hours since last update 86,400,000 = 1 day
        console.log("RUNNING UPDATE TRENDING")
        fetch(`https://yfapi.net/v1/finance/trending/us`,{
                method:"GET",
                headers:{
                        'x-api-key': YAHOOFINANCEAPI
                    }
                })
        .then((response) => {return response.json()})
            .then((data) => {
                const tickers = data.finance.result[0].quotes.map((item) => {
                    return item.symbol
                })
                fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${tickers.join(',')}`,{method:"GET"})
                .then((response) => {return response.json()})
                .then((data) => {
                    if(data.quoteResponse.error) throw data.quoteResponse.error
                    var resData = data.quoteResponse.result.map((item) => {
                        return {symbol:item.symbol, name:item.shortName, price:item.regularMarketPrice, change:item.regularMarketChangePercent, dayRange:item.regularMarketDayRange}
                    })
                        const update1 = {
                            "$set": {
                                "key":"trending-stocks",
                                "data" : {
                                    "updated": new Date,
                                    "data": resData
                                }
                            }
                        };
                                otherCollection.updateOne({"key":"trending-stocks"},update1)
                                return resData.stocks
                })
            })
        //     })
        
    }
    return trending.data.data
}