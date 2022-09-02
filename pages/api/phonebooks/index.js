import { getToken } from "next-auth/jwt";
import { connectMongo } from "../../../config/database/connection";
import Phonebook from "../../../config/database/models/phonebook";
import Session from "../../../config/database/models/session";

const secret = process.env.SECRET;

const getPhonebooks = async (req, res) => {
  try {
    const user = req.user;

    const phonebooks = await Phonebook.find({ user });
    res.status(200).json({
      status: "success",
      count: phonebooks.length,
      phonebooks,
    });
  } catch (error) {
    res.send(error);
  }
};

const addPhoneBook = async (req, res) => {
  try {
    const user = req.user;
    await Phonebook.create({ ...req.body, user });

    res.status(201).json({
      status: "success",
      message: "phonebook successfully created",
    });
  } catch (error) {
    res.send(error);
  }
};

export default async function handler(req, res) {
  await connectMongo();
  const { method } = req;

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

  switch (method) {
    case "GET":
      await getPhonebooks(req, res);
      break;

    case "POST":
      await addPhoneBook(req, res);
      break;

    default:
      break;
  }
}
