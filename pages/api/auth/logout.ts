import cookie from 'cookie'

async function logoutCall (req, res){
    if (req.method === 'POST'){
              res.setHeader('Set-Cookie',[
                cookie.serialize('auth',"",{ // Handles Authentication
                  httpOnly:true, 
                  secure: process.env.NODE_ENV !== 'development',
                  sameSite: 'strict',
                  maxAge: 0, //6 hours
                  path: '/'
              }),
                cookie.serialize('data',"",{ // Basic User Data
                  secure: process.env.NODE_ENV !== 'development',
                  sameSite: 'strict',
                  maxAge: 0, //6 hours
                  path: '/',
              })])
              res.status(201).json({message: 'You have been logged out'})
    }
    else {
      res.status(405).json({message: "We only support POST"})
    }
  }
  export default logoutCall;