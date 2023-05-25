import {MongoClient, ServerApiVersion } from 'mongodb';
import {MONGOUSERNAME, MONGOPASSWORD } from './secret';
export default async function getUser (emailKey: string){
    
    const client = await MongoClient.connect(`mongodb+srv://${MONGOUSERNAME}:${MONGOPASSWORD}@cluster0.yksmj.mongodb.net/StocksApp?retryWrites=true&w=majority`);
    const db = client.db();
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({email:emailKey}).toArray()
    client.close()
    if (users.length > 1){throw `More than 1 users share the same email, ${emailKey}`}
    if (users.length === 0) return undefined
    return users[0]
}
