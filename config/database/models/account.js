import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.models.Account || mongoose.model("Account", AccountSchema);
