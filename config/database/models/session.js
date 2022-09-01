import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.models.Session || mongoose.model("Session", SessionSchema);
