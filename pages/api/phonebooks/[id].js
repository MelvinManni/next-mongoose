import { getToken } from "next-auth/jwt";
import Phonebook from "../../../config/database/models/phonebook";
import Session from "../../../config/database/models/session";
import verifyUserSession from "../../../config/utils/verifyUserSession";

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
  const { method } = req;

  await verifyUserSession({
    req,
    res,
    getToken,
    Session,
  });

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
