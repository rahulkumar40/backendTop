import { User } from "../model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const registerUser = async(req, res)=>{
    console.log("RegisterUser controller HIT");
    console.log("User data ", req.body)
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
            return res.status(400).json({
                success:false,
                message:"User All Ready Exist"
            })
        }

        console.log("yha to nhi hai na")
        if(password !==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"fill Matched Passowrd",
            });
        }
        const hashPassword = await bcrypt.hash(password,10);
        console.log("hash password ", hashPassword , "password", password)

        const newUser = await User.create({name, email,  password:hashPassword, gender, role})

        res.status(200).json({
            success:true,
            message:"User Registered",
            user:newUser
        })
    }catch(e){
        console.log("Error ho gya")
       return res.status(500).json({
            success:false,
            message:"Check Internal Server",
        })
    }
}
export const login = async (req, res)=>{
    console.log("login User : ", req.body)
    try{
        const {email, password, role} = req.body;
        console.log("Email : ", email,  "Password : ", password);
        if(!email || !password || !role){
            return res.status(400).json({
                success:false,
                message:"Fill all Field"
            })
        }
        const realUser = await User.findOne({email});
        if(!realUser){
            return res.status(400).json({
                success:false,
                message:"User don't Exist || Register First"
            })
        }
        console.log(realUser)
        if(role!==realUser.role){
            return res.status(401).json({
                success:false,
                message:"Not Valid Role"
            })
        }
        const ok = await bcrypt.compare(password,realUser.password);
        console.log(ok ,"User login or not ");
        if(!ok){
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }
        console.log(realUser , "me hu e")

        console.log(jwt)
        console.log("key nhi cal raha hai")
        console.log("Secret key ", process.env.JWT_SECRET_KEY)
        // here direct passing data give me error like
        // jwt.sign(realUser, process.env.SECRETKey, {time}) ==> bed practice 
        const token =  jwt.sign({_id:realUser._id, role:realUser.role,email:realUser.email}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        console.log("chal bahi")
        console.log("token ", token)
        res.status(200).cookie("token", token,  { expiresIn: "1h",}).json({
            succuss:true,
            message: "Login Done !",
            token:token,
            user:realUser
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
        const user = await User.find();
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Present",
            })
        }
        res.status(200).json({
            success:true,
            message:"See Sir", 
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
        const token = req.cookies.token;
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