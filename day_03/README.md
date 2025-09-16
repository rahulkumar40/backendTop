# Basic Client–Server Integration (Express + React Vite)

This project shows a simple integration of an **Express.js backend** with a **React (Vite) frontend**.  
The backend serves an API of jokes, and the frontend fetches and displays them.

---

## 🚀 Backend (Express Server)

### index.js
```js
import express from 'express'
import dotenv from 'dotenv'

const app = express();
dotenv.config();

const PORT_NO = process.env.PORT_NO || 4000;

app.get('/', (req, res) => {
  res.send("This is Rahul Kumar")
})

// Get a list of 5 jokes
app.get('/api/v1/jokes', (req, res) => {
  const jokes = [
    { id: 1, title: "Why don't scientists trust atoms?", content: "Because they make up everything!" },
    { id: 2, title: "Why did the scarecrow win an award?", content: "Because he was outstanding in his field!" },
    { id: 3, title: "What do you call a fake noodle?", content: "An Impasta!" },
    { id: 4, title: "Why don't skeletons fight each other?", content: "They don't have the guts." },
    { id: 5, title: "I'm reading a book on anti-gravity.", content: "It's impossible to put down!" },
  ];
  res.send(jokes)
})

// Serve frontend build files
app.use(express.static('dist'));

app.listen(PORT_NO, () => {
  console.log(`Server running at ${PORT_NO}`)
})
Run backend
bash
Copy code
npm install express dotenv
node index.js
🎨 Frontend (React + Vite)
src/App.jsx
jsx
Copy code
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);

  const fetchData = () => {
    axios
      .get(`/api/v1/jokes`) // same origin via proxy
      .then((res) => {
        setJokes(res.data);
      })
      .catch((e) => {
        console.log("Error ", e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>My name is Rahul Kumar</h1>
      <p>Jokes : {jokes.length}</p>

      {jokes.length > 0 && (
        <div>
          {jokes.map((joke) => (
            <div key={joke.id}>
              <h3>{joke.title}</h3>
              <p>{joke.content}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
⚙️ Proxy Setup (Vite)
To avoid CORS issues and make frontend and backend look like they’re on the same origin:

vite.config.js
js
Copy code
export default {
  server: {
    proxy: {
      "/api": "http://localhost:4000", // backend origin
    },
  },
};
🌍 CORS Note
By default, browser blocks cross-origin requests (5173 → 4000).

Using proxy in Vite fixes this by routing /api calls to backend.

Alternatively, enable cors in backend:

js
Copy code
import cors from "cors";
app.use(cors());
✅ How to Run
Start Backend

bash
Copy code
node index.js
Start Frontend

bash
Copy code
npm run dev
Visit: http://localhost:5173

📌 Features
Express server with jokes API.

React client fetching and displaying jokes.

Proxy setup for same-origin requests.

yaml
Copy code

---

Do you also want me to include the **`.env` example** (like `PORT_NO=4000`) inside this README so it’s fully copy-paste ready