import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Load old messages
    axios.get("http://localhost:5000/messages").then((res) => {
      setMessages(res.data);
    });

    // Connect WebSocket
    const ws = new WebSocket("ws://localhost:5000");
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };
    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (input.trim() && username) {
      const msg = { username, text: input };
      socket.send(JSON.stringify(msg));
      setInput("");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        p: 3,
      }}
    >
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          💬 MERN WebSocket Chat
        </Typography>

        {!username ? (
          <Box sx={{ textAlign: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1 }} />,
              }}
            />
          </Box>
        ) : (
          <>
            {/* Chat Messages */}
            <Paper
              variant="outlined"
              sx={{
                height: 320,
                overflowY: "auto",
                p: 2,
                mb: 2,
                borderRadius: 2,
                bgcolor: "#f9f9f9",
              }}
            >
              {messages.map((msg, i) => (
                <Card
                  key={i}
                  elevation={2}
                  sx={{
                    mb: 1.5,
                    p: 1,
                    borderRadius: 2,
                    bgcolor:
                      msg.username === username ? "#e3f2fd" : "#fff",
                  }}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                      {msg.username[0].toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {msg.username}
                      </Typography>
                      <Typography variant="body2">{msg.text}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Paper>

            {/* Input & Button */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={sendMessage}
                sx={{ borderRadius: 2 }}
              >
                Send
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default App;
