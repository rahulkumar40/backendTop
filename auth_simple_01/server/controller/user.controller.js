import { User } from "../model/user.model.js";
import { OTP } from "../model/otp.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import sendEmail from "../config/sendEmail.config.js";
dotenv.config()
export const registerUser = async(req, res)=>{
    // console.log("RegisterUser controller HIT");
    // console.log("User data ", req.body)
    try{
        const {name, email, password, confirmPassword,gender, role} = req.body;
        console.log(name)
        if(!name || !email || !password || !confirmPassword || !gender || !role){
            return res.status(400).json({
                success:false,
                message:"Fill All Field"
            })
        }
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(409).json({
                success:false,
                message:"User Exit || Try with Another account"
            })
        }

        // console.log("yha to nhi hai na")
        if(password !==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"fill Matched Passowrd",
            });
        }
        const hashPassword = await bcrypt.hash(password,10);
        console.log("hash password ", hashPassword , "password", password)

        const newUser = await User.create({name, email,  password:hashPassword, gender, role})
        console.log(newUser)
        res.status(200).json({
            success:true,
            message:"User Registered",
        })
    }catch(e){
        // console.log("Error ho gya")
       return res.status(500).json({
            success:false,
            message:"Check Internal Server",
            error:e.message
        })
    }
}
export const login = async (req, res)=>{
    // console.log("login User : ", req.body)
    try{
        const {email, password, role} = req.body;
        console.log("Email : ", email,  "Password : ", password);
        if(!email || !password || !role){
            return res.status(400).json({
                success:false,
                message:"Fill all Field"
            })
        }
        const realUser = await User.findOne({email}).populate('profile');
        if(!realUser){
            return res.status(404).json({
                success:false,
                message:"User don't Exist || Register First"
            })
        }
        // console.log(realUser)
        if(role!==realUser.role){
            return res.status(401).json({
                success:false,
                message:"Not Valid Role"
            })
        }
        const ok = await bcrypt.compare(password,realUser.password);
        // console.log(ok ,"User login or not ");
        if(!ok){
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }
        // console.log(realUser , "me hu e")

        // console.log(jwt)
        // console.log("key nhi cal raha hai")
        // console.log("Secret key ", process.env.JWT_SECRET_KEY)
        // here direct passing data give me error like
        // jwt.sign(realUser, process.env.SECRETKey, {time}) ==> bed practice 
        const token =  jwt.sign({_id:realUser._id, role:realUser.role,email:realUser.email}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        // console.log("chal bahi")
        // console.log("token ", token)
        res.status(200).cookie("token", token,  {expires: new Date(Date.now() + 1000 * 60 * 60)}).json({
            success:true,
            message: "Login Done !",
            user:realUser,
            expiry: Date.now() + 1000 * 60 * 60,
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"Internal Error"
        })
    }
}

export const getSingleUser = async(req, res)=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Email To Get User"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Present",
            })
        }
        res.status(200).json({
            success:true,
            message:"See Sir", user
        })
    }catch(err){
        res.status(500).json({
            success:false, 
            message:"Server Error"
        })
    }
}
export const getAllUser = async(req, res)=>{
    try{
        const user = await User.find().populate('profile');
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Present",
            })
        }
        res.status(200).json({
            success:true,
            message:"All Users Fetch", 
            users:user
        })
    }catch(err){
        res.status(500).json({
            success:false, 
            message:"Server Error"
        })
    }
}

export const logout = async(req, res)=>{

    try{
        const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
        console.log(token)
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Invalid Access"
        })
    }

    res.status(200).clearCookie('token').json({
        success:true,
        message:"Log Out"
    })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }   
}

export const deleteSingleUser = async(req, res)=>{
    console.log(req.body)
    try{
        const {email} = req.body;
        if(!email){
            return res.status(401).json({
            success:false,
            message:"Check Valid Data"
        })}
     await User.findOneAndDelete({email})
     res.status(200).json({
        success:true,
        message:"User Deleted !"
     })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

export const changePassword = async(req, res)=>{
    console.log(req.body)
    try{
        const {email, password,  newPassword} = req.body;
        if(!email || !password || !newPassword) {
            return res.status(400).json({
                success:false,
                message:"Empty Field"
            })
        }
        const user = await User.findOne({email});
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log("If valid then True === ", isValidPassword);

        if(!isValidPassword){
            return res.status(401).json({
                success:false,
                message:"Incorrect Password || forget Password"
            })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        console.log("chal raha hu kjj")
        const chnage = await User.findByIdAndUpdate({_id:user._id}, {password:hashPassword}, {new:true});
        console.log(chnage)
        res.status(200).json({
            success:false,
            message:"Password Changed",
            chnage
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

export const forgetPassword = async(req, res)=>{
    console.log("ander hu forget ke")
    try{
        const {email} = req.body;
        if(!email){
            return res.status(401).json({
                success:false,
                message:"Enter Email"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not found | Enter real email"
            })
        }

        const otp = Math.floor(1000000+Math.random()*999999);
        console.log("OTP BOLTE : ", otp);

        const createOTP = await OTP.create({email, otp});

        const message = `Your verification code for passowrd reset is ${otp} `;
       await sendEmail(email, "Forget Password", message);
       res.status(200).json({
        success:true,
        message:"OTP Send To Mail",createOTP
       })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error",
            error : error.message
        })
    }
}

export const handleVarifyOtp = async(req, res)=>{
    try{
        const {email, otp} = req.body;
        const otpRecord = await OTP.findOne({email, otp});
        if(!otpRecord || Date.now()> otpRecord.createdAt.getTime() + 60*60*1000){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired otp"
            })
        }

        res.status(200).json({
            success:false,
            message:"OTP Verified !"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const handleResetPassword = async(req, res)=>{
    try{
        const {email, otp, newPassword} = req.body;
        console.log(email)

        const otpRecord = await OTP.findOne({email, otp});
        console.log("hka")
        if(!otpRecord || Date.now()> otpRecord.createdAt.getTime() + 60*60*1000){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired otp"
            })
        } 
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Data Not availabel"
            })
        }
        const hashPassword = await  bcrypt.hash(newPassword, 10);
        console.log("kaj dl")
        const chnage = await User.findByIdAndUpdate({_id:user._id}, {password:hashPassword}, {new:true});
        console.log("hkalsd ")
        await OTP.deleteMany({email})
        console.log("klajsd kjaskdfj lkasj")
        res.status(200).json({

            success:true,
            message:"Forget Password Done"
        })

    }catch(e){
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}