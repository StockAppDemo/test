import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
import {MONGOUSERNAME, MONGOPASSWORD } from '/pages/api/secret';

const client = new MongoClient(`mongodb+srv://${MONGOUSERNAME}:${MONGOPASSWORD}@cluster0.yksmj.mongodb.net/StocksApp?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function database(req, res, next) {
    console.log("insideDataBase")
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db('users');
    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;