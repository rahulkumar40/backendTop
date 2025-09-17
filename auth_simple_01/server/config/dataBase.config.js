import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const DATA_BASE_URL = process.env.DATA_BASE_URL;
const dbConnection = async()=>{
    try{
        mongoose.connect(`${DATA_BASE_URL
        }`)
        console.log("Connection successfully Done !")
    }catch(e){
        console.log("Error in+\ DB Connection --> config file-")
    }
}
export default dbConnection;