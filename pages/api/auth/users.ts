import { authenticated } from '../../../src/api/authenticated'
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import { MongoClient, ServerApiVersion } from 'mongodb';
import { MONGOUSERNAME, MONGOPASSWORD } from '../../../src/api/secret';
export default authenticated( async function getUser (req: NextApiRequest, res: NextApiResponse){
  // if (req.method === "POST"){

    var mongoConnectionSuccessful = false;
    var client
    while (!mongoConnectionSuccessful) {
      try {
        const client = await MongoClient.connect(`mongodb+srv://${MONGOUSERNAME}:${MONGOPASSWORD}@cluster0.yksmj.mongodb.net/StocksApp?retryWrites=true&w=majority`);
        mongoConnectionSuccessful = true;
        // return;
      } catch (error) {
        console.log(error);
      }
    }
    // await new Promise(r => setTimeout(r, 2000));
      const email = req.body.email
      
      const db = await client.db();
      const usersCollection = await db.collection('users');
      const resultArray = await usersCollection.find({email:email}).toArray()
      client.close()
      
      delete resultArray[0].password
      res.status(201)
      res.json(resultArray[0])
      // res.send({message:"connected"})
})
  
    // res.end()
  // }
  // else{
    // console.log("only post accepted")
  // }