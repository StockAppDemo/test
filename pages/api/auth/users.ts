import { authenticated } from 'src/api/authenticated'
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import { MongoClient, ServerApiVersion } from 'mongodb';
export default authenticated( async function getUser (req: NextApiRequest, res: NextApiResponse){
    var mongoConnectionSuccessful = false;
    var client
    while (!mongoConnectionSuccessful) {
      try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        mongoConnectionSuccessful = true;
      } catch (error) {
        console.log(error);
      }
    }
      const email = req.body.email
      
      const db = await client.db();
      const usersCollection = await db.collection('users');
      const resultArray = await usersCollection.find({email:email}).toArray()
      client.close()
      
      delete resultArray[0].password
      res.status(201)
      res.json(resultArray[0])
})
  
    // res.end()
  // }
  // else{
    // console.log("only post accepted")
  // }