import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },   // "admin_<teacherId>"
  sender: { type: String, required: true },   // "admin" ya teacher ka _id
  text: { type: String },                     // actual message
  filevideophoto: { type: String },          // optional file/video/image
  seen: { type: Boolean, default: false },   // message read or not
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Message", messageSchema);
