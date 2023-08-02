const express = require("express"); 
const app = express();

const sendToken = (res,user,message,statusCode = 200) =>{
       // console.log("USER: ",user)
        const token = user.getJWTToken()
        const user_id = user._id;
        console.log("USER_ID",user_id)
        
        const options = {
                user: user,
                
                expires : new Date(Date.now() + 15 *24 *60 *60 * 1000),
        }
        res.status(statusCode).cookie("token",token,options).json({
                success: true,
                message,
                user_id,
                token
        }) 
};
module.exports = {sendToken}
