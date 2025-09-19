import { uplaod } from "../middlewares/multer.middlerware.js";
import { Profile } from "../model/profile.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { uplaod } from "../middlewares/multer.middlerware.js";
const profile = async(req, res)=>{
    try{
        const {address, image} = req.body;
        // if(!address || !image) {
        //     return res.status(401).json({
        //         success:flase,
        //         message:"plase edit filed"
        //     })
        // }
        console.log(address)
        console.log(image)
        const asn =  await uplaod(image);
        await Profile.create({address});
        console.log(ans);
        res.status(200).json({
            message:"ho gyaa"
        })

    }catch(e){
        console.log("Error profile Controller")
        return res.status(500).json({
            succuss:false,
            message:"Inter server Error"
        })
    }
}

export default profile;