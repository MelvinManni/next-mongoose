import { connectMongo } from "../database/connection";

const secret = process.env.SECRET;

export default async function verifyUserSession({ req, res, getToken, Session }) {
  await connectMongo();
  const sessionToken = await getToken({ req, secret, raw: true });

  if (!sessionToken) {
    return res.status(401).json({ status: "failed", message: "please login!" });
  }

  const user = await Session.findOne({ sessionToken });

  if (!user) {
    return res.status(404).json({ status: "failed", message: "session or user does not exist" });
  }

  if (new Date(user?.expires) < new Date()) {
    return res.status(440).json({ status: "failed", message: "session expired!" });
  }

  req.user = user.userId;
}
