import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/dataBase.config.js'
import router from './router/user.router.js';
const app = express();

dotenv.config();
app.use(express.json()) /// its order is very important 
app.use('/api/v1', router)
// app.use(express.json()) /// its order is very important  --> if i use it here then it never will run propery give error 500 
const PORT_NO = process.env.PORT_NO;

app.get('/', (req, res)=>{
    res.send("Ja ho");
})

app.listen(PORT_NO, ()=>{
    console.log(PORT_NO, "Thik Hai")
})
dbConnection();
