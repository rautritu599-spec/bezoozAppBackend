import Message from "../models/message.model.js";
import path from "path";

export const saveMessage = async (req, res) => {
  try {
    const { roomId, sender, text } = req.body;

    if (!roomId || !sender) {
      return res
        .status(400)
        .json({ status: false, error: "roomId and sender required" });
    }

    let filePath = "";

    if (req.files && req.files.filevideophoto) {
      const file = req.files.filevideophoto;

      let folder = "file";
      if (file.mimetype.startsWith("image")) folder = "img";
      else if (file.mimetype.startsWith("video")) folder = "videos";

      const fileName = Date.now() + "_" + file.name;

      // 🔥 Use exact path you gave
      const UPLOAD_DIR = path.resolve(
        "C:/Users/Hp/OneDrive/Desktop/admin/admin panel/public/upload"
      );

      const serverSavePath = path.join(UPLOAD_DIR, folder, fileName);

      await file.mv(serverSavePath);

      // 🔥 Include folder in path
      filePath = `/upload/${folder}/${fileName}`;
    }

    const newMessage = await Message.create({
      roomId,
      sender,
      text: text || "",
      filevideophoto: filePath ,
    });

    res.status(201).json({
      status: true,
      data: newMessage,
    });
  } catch (error) {
    console.error("SaveMessage error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};



export const fetchMessages = async (req, res) => {
  try {
    const { roomId } = req.query;
    if (!roomId) {
      return res.status(400).json({ error: "roomId required" });
    }

    // DB se sab messages fetch
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    res.status(200).json(messages); // <- ye array hamesha return hona chahiye
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findByIdAndDelete(messageId);
    if (!message) {
      return res.status(404).json({ status: false, error: "Message not found" });
    }

    res.status(200).json({ status: true, msg: "Message deleted" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const { roomId } = req.query;
    if (!roomId) return res.status(400).json({ message: "roomId required" });

    const count = await Message.countDocuments({ roomId, seen: false });
    return res.json({ count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
