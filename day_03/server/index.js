import express from 'express'
import dotenv from 'dotenv'
const app = express();

dotenv.config();
const PORT_NO = process.env.PORT_NO || 4000;
app.get('/', (req, res)=>{
    res.send("This is Rahul Kumar")
})
// get a list of 5 jokes 
app.get('/api/v1/jokes', (req, res)=>{
    const jokes = [
  {
    id: 1,
    title: "Why don't scientists trust atoms?",
    content: "Because they make up everything!",
  },
  {
    id: 2,
    title: "Why did the scarecrow win an award?",
    content: "Because he was outstanding in his field!",
  },
  {
    id: 3,
    title: "What do you call a fake noodle?",
    content: "An Impasta!",
  },
  {
    id: 4,
    title: "Why don't skeletons fight each other?",
    content: "They don't have the guts.",
  },
  {
    id: 5,
    title: "I'm reading a book on anti-gravity.",
    content: "It's impossible to put down!",
  },
];
    res.send(jokes)
})
app.use(express.static('dist'));



app.listen(PORT_NO, ()=>{
    console.log(`Server running at ${PORT_NO}`)
})