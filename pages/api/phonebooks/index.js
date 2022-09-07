import { getToken } from "next-auth/jwt";
import Phonebook from "../../../config/database/models/phonebook";
import Session from "../../../config/database/models/session";
import verifyUserSession from "../../../config/utils/verifyUserSession";


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
  const { method } = req;
  await verifyUserSession({
    req,
    res,
    getToken,
    Session,
  });

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
