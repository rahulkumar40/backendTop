import multer from 'multer'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

const storage = multer.diskStorage({
    // req--> for json data 
    // file --> for file data (document , image, video )
    // cb --> call back 
  destination: function (req, file, cb) {
    cb(null, "./temp"); // folder where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random()*100000);
    cb(null, file.originalname + '_' + uniqueSuffix); // unique file name
  },
});

export const uplaod = multer({storage});

