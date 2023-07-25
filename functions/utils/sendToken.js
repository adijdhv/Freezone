const express = require("express"); 
const app = express();

const sendToken = (res,user,message,statusCode = 200) =>{
        console.log("USER: ",user)
        const token = user.getJWTToken()
      
       
        const options = {

                user: user,
                expires : new Date(Date.now() + 15 *24 *60 *60 * 1000),
               // httpOnly: true,
                

                //secure:true,
                //sameSite:
        }
         

        res.status(statusCode).cookie("token",token,options).json({
                success: true,
                message,
                user
        })


};
module.exports = {sendToken}
