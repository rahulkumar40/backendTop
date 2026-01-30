import { User } from "../model/user.model.js";

const createUserSay = async(req, res)=>{
    try{
        const {message} = req.body;
        const {id} = req;
        if(!message){
            res.status(401).json({
                message:"Empty Field",
                success:false,
            })
        }
        const existUser = await User.findById({id});
        if(existUser){
            res.status(403).json({
                success:false,
                message:"You All Ready did !"
            })
        }

        await User.testimonialMSG.create({message:message})
        res.status(200).json({
            success:true,
            message:"Ok Done"
        })

    }catch(e){
        console.log("Error while")
        res.status(500).json({
            success:"false",
            message:"dont do right."
        })
    }
}

export default createUserSay;