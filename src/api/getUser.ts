import {MongoClient, ServerApiVersion } from 'mongodb';
export default async function getUser (emailKey: string){
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({email:emailKey}).toArray()
    client.close()
    if (users.length > 1){throw `More than 1 users share the same email, ${emailKey}`}
    if (users.length === 0) return undefined
    return users[0]
}
