import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const sendEmail = async(email, subject, message)=>{
    try{
        console.log("email ", email, "subject : ", subject, "message: ", message)
        const transport = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            posrt:587,
            secure:false,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        await transport.sendMail({
        from: process.env.MAIL_USER,
        to:email,
        subject,
        text:message
    }

)
    }catch(err){
        console.log("error in sendEmail")
    } 
}

export default sendEmail;