import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
