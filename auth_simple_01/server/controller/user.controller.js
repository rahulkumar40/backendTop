import { User } from "../model/user.model.js";
import bcrypt from 'bcrypt'
export const registerUser = async(req, res)=>{
    console.log("RegisterUser controller HIT");
    console.log("User data ", req.body)
    try{
        const {name, email, password, confirmPassword,gender} = req.body;
        console.log(name)
        if(!name || !email || !password || !confirmPassword || !gender){
            return res.status(400).json({
                success:false,
                message:"Fill All Field"
            })
        }
        const existUser = await User.findOne({email})
        if(existUser.email===email){
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

        await User.create({name, email,  password:hashPassword,gender})

        res.status(200).json({
            success:true,
            message:"User Registered"
        })
    }catch(e){
        console.log("Error ho gya")
       return res.status(500).json({
            success:false,
            message:"Check Internal Server"
        })
    }
}
export const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        console.log("Email : ", email,  "Password : ", password);
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill all Field"
            })
        }
        const realUser = await User.findOne({email});
        const ok = await bcrypt.compare(password,realUser.password);
        console.log(ok ,"User login or not ");
        if(ok){
            return res.status(200).json({
                success:true,
                message:"Loged In"
            })
        }else {
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }
    }catch(e){
        return res.status.json({
            success:false,
            message:"Internal Error"
        })
    }
}