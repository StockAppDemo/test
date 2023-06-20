import cookie from "cookie"

import { NextApiRequest, NextApiResponse } from "next"

async function logoutCall(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("auth", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 0, //6 hours
        path: "/",
      }),
      cookie.serialize("data", "", {
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 0, //6 hours
        path: "/",
      }),
    ])
    res.status(201).json({ message: "You have been logged out" })
  } else {
    res.status(405).json({ message: "We only support POST" })
  }
}
export default logoutCall
