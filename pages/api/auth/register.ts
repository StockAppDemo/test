import {MongoClient, ServerApiVersion } from 'mongodb';
import {hash} from 'bcrypt';
import getUser from '../../../src/api/getUser'
import { MONGOUSERNAME,MONGOPASSWORD } from '../../../src/api/secret';
import { setLoginJWTHeader } from './login'
import { UserT } from '../../../src/ts/interfaces/user';


async function registerCall (req, res){
  if (req.method === 'POST'){
    const data = req.body;
    const {name,email ,password} = data;
    const user = await getUser(email)
    if (user === undefined){
      const client = await MongoClient.connect(`mongodb+srv://${MONGOUSERNAME}:${MONGOPASSWORD}@cluster0.yksmj.mongodb.net/StocksApp?retryWrites=true&w=majority`);
      const usersCollection = client.db("StocksApp").collection('users');

      hash(password, 12, async function(err, hash) {
        const user = {name:name,email:email,admin:false,password:hash,stocks:["GOOG","AAPL","IBM"]}
        const result = await usersCollection.insertOne(user)
          setLoginJWTHeader(res,{_id:result.insertedId, ...user})
          client.close();
          res.status(201).json({message: "User Inserted"})
          res.send()
      });
    }
    else {
      res.status(409).json({message: "User already exists"})
      res.send()
    }
  }
  else {
    res.status(500).json({message: "Only POST requests allowed"})
    res.send()
  }
}
export default registerCall;