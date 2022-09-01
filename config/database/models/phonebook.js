import mongoose from "mongoose";

const PhonebookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: [true, "Each contact must be linked to a user"],
  },
  name: {
    type: String,
    required: [true, "Please provide contact name"],
  },
  mobile: Number,
  fax: Number,
  work: Number,
});

module.exports = mongoose.models.Phonebook || mongoose.model('Phonebook', PhonebookSchema)

