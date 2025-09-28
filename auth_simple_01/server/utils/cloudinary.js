import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
import fs from 'fs'; // file system in node js 
// help to read , write , upload , and other work

dotenv.config();
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
}); // file uploadkrne ki permission deta hai 

const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath){
            return null // cloud not file path 
        }

        // upload the file path on cloudinary 
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto",
        })
        
        // file has been uploaded 
        console.log("Successfully Uploaded on cloudinary ", res.url);
        return res;
    }catch(e){
        fs.unlinkSync(localFilePath);
        // remove the locally saved tempory file as the upload operatio got failed.
        console.log("error file uploading on cloudinary");
        return null;
    }
}
export {uploadOnCloudinary};
// cloudinary.v2.uploader.upload("path/", {
//     public_id:"Plympic_Flag"
// });