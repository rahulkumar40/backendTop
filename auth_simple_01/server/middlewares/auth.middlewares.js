import jwt from 'jsonwebtoken';
export const auth = async(req, res, next)=>{
    console.log(req);
    try{
        console.log("me hu")
        console.log(req.cookies);

        console.log("original cooke", req.cookies)
        const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
        console.log(token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Expired  "
            })
        }
    
        
        const decode =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("decode : ", decode)
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        req.role = decode.role
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unauthorized Accessed !"
        })
    }
}

export const isUser = async(req, res,next)=>{
    try{
        const {role} = req;
        console.log(role )
        if(!role){
            return res.status(401).json({
                success:false,
                message:"Invalid Role"
        })
    }
        if(role!=='User'){
        return res.status(401).json({
            success:false,
            message:"Accessed Denny"
        }
        )
    }
    next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error | Internal Error"
        })
    }
    
}
export const isAdmin = async(req, res,next)=>{
    try{
        const {role} = req;
        console.log(role )
        if(!role){
            return res.status(401).json({
                success:false,
                message:"Invalid Role"
        })
    }
        if(role!=='Admin'){
        return res.status(401).json({
            success:false,
            message:"Accessed Denny | User Can't Access"
        }
        )
    }
    next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error | Internal Error"
        })
    }
    
}