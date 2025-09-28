import multer from 'multer'
const storage = multer.diskStorage({
    // req--> for json data 
    // file --> for file data (document , image, video )
    // cb --> call back 
  destination: function (req, file, cb) {
    cb(null, "./middlewares/temp"); // folder where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random()*100000);
    cb(null, file.originalname); // unique file name
  },
});

export const uplaod = multer({storage});

