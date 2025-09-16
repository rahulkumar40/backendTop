import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { WebSocketServer } from "ws";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/chatApp");

// Message Schema
const MessageSchema = new mongoose.Schema({
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", MessageSchema);

// REST API → fetch old messages
app.get("/messages", async (req, res) => {
  const msgs = await Message.find().sort({ createdAt: 1 });
  res.json(msgs);
});

const PORT = 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("New client connected ✅");

  ws.on("message", async (msg) => {
    const parsed = JSON.parse(msg); // {username, text}
    console.log("Message:", parsed);

    // Save to DB
    const newMsg = new Message(parsed);
    await newMsg.save();

    // Broadcast to all
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(newMsg));
      }
    });
  });
});
