// import { Profile } from "../model/profile.model.js";
// // import { uploadOnCloudinary } from "../utils/cloudinary.js";
// // import { uplaod } from "../middlewares/multer.middlerware.js";
// const profile = async(req, res)=>{
//     try{
//         const {address, image} = req.body;
//         // if(!address || !image) {
//         //     return res.status(401).json({
//         //         success:flase,
//         //         message:"plase edit filed"
//         //     })
//         // }
//         console.log(address)
//         console.log(image)
//         await Profile.create({address});
//         console.log(ans);
//         res.status(200).json({
//             message:"ho gyaa"
//         })

//     }catch(e){
//         console.log("Error profile Controller")
//         return res.status(500).json({
//             succuss:false,
//             message:"Inter server Error"
//         })
//     }
// }

// export default profile;
import { Profile } from "../model/profile.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const profile = async (req, res) => {
  try {
    const { address } = req.body;

    // If no file uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const uploadedImage = await uploadOnCloudinary(req.file.path);

    // Create profile in DB
    const ans = await Profile.create({
      address,
      image: uploadedImage.url, // save Cloudinary URL
      user: req.user?.id, // if you have user from auth middleware
    });

    console.log("Profile saved:", ans);

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: ans,
    });
  } catch (e) {
    console.error("Error in profile controller:", e.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default profile;
