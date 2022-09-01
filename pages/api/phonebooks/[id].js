import { getToken } from "next-auth/jwt";
import { connectMongo } from "../../../config/database/connection";
import Phonebook from "../../../config/database/models/phonebook";
import Session from "../../../config/database/models/session";

const secret = process.env.SECRET;

const getPhonebook = async (req, res) => {
  try {
    const phonebook = await Phonebook.findOne({
      user: req.user,
      _id: req.query.id,
    });
    res.status(200).json({
      status: "success",
      contact: phonebook,
    });
  } catch (error) {
    res.send(error);
  }
};

const updatePhonebook = async (req, res) => {
  try {
    const user = req.user;

    const docId = req.query.id;

    // Remove field we do not want to update
    req.body.user = undefined;
    req.body._id = undefined;
    await Phonebook.findOneAndUpdate({ _id: docId, user }, { ...req.body });

    res.status(201).json({
      status: "success",
      message: `phonebook with id ${docId} updated`,
    });
  } catch (error) {
    res.send(error);
  }
};

const deletePhonebook = async (req, res) => {
  try {
    const user = req.user;
    await Phonebook.findOneAndDelete({ _id: req.query.id, user });

    res.status(201).json({
      status: "success",
      message: `phonebook with id ${req.params.id} deleted`,
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
      await getPhonebook(req, res);
      break;

    case "PATCH":
      await updatePhonebook(req, res);
      break;

    case "DELETE":
      await deletePhonebook(req, res);
      break;

    default:
      break;
  }
}
