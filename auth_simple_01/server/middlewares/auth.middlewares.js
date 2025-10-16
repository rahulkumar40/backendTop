import jwt from 'jsonwebtoken';
// authorization --> that user is login then he/she can acess data or service ....
export const auth = async(req, res, next)=>{
    // console.log(req);
    try{
        // console.log("me hu")
        // console.log(req.cookies);

        // console.log("original cooke", req.cookies.token)

        const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
        // console.log("token yha hai ", token)
        // console.log(token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Expired | Login Again "
            })
        }
    
        const decode =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("decode : ", decode)
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        req.role = decode.role;
        req.id=decode._id;
        // console.log(req.id); 
        // all comment working properly ... 
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
        // console.log(role )
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
        // console.log(role )
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