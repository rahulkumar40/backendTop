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
import { User } from "../model/user.model.js";
const profile = async (req, res) => {
  try {
    const { address, bio, about,socialMedia, } = req.body;

    // console.log(address, bio, about, socialMedia);
    // If no file uploaded
    // 2. Handle image upload (unchanged)
    let imageUrl = null;
    if (req.file) {
      const uploadedImage = await uploadOnCloudinary(req.file.path);
      imageUrl = uploadedImage.url;
    }
    
    // Create profile in DB
    const userId = req.id;

    // console.log(userId);
    const data = await Profile.create( {
      address,
      image: imageUrl, // save Cloudinary URL
      bio,
      about,
      socialMedia ,
    });

    const newUser = await User.findByIdAndUpdate(userId, {profile:data._id});
    // console.log("New updated User...", newUser)
    // console.log("Profile saved:", data);


    // const prouser = await User.findById(userId).populate("profile");
    // console.log(prouser)
    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data
    });
  } catch (e) {
    // console.error("Error in profile controller:", e.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default profile;
