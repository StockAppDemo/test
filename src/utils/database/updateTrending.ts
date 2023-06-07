import { MongoClient } from 'mongodb';

// import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

export default async function getTrendingStocks(key, data) {
    console.log("getTrendingStocks")
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const otherCollection = db.collection('other');
    const trendingTable = await otherCollection.findOne({key:"trending"})
    const update1 = {
        "$set": {
            "trending": {
                "updated": new Date,
                "data": data
            }
        }
    };
    otherCollection.updateOne({"key":"trending"},update1)

    }