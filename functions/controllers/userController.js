 
//const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
//const ftp = require('basic-ftp');
const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../models/user");

const { catchAsyncError } = require("../middleware/catchAsyncError"); 
//const ErrorHandler = require("../utils/errorHandler.js");
const { sendToken } = require("../utils/sendToken")
//const session = require('express-session');
//const { setUserNameCookie, getUserNameFromCookie } = require('../utils/storeCurrent');


 
 
const signup = async (req, res) => {
        try {
                const { email, username, password } = req.body;



                const existingUser = await User.findOne({ email: email });

                if (existingUser) {
                        return res.status(400).json({ messsage: "user already Exists" })
                }
                const hashedPassword = await bcrypt.hash(password, 10);

                 await User.create({
                        email: email,
                        password: hashedPassword,
                        username: username,
                         
                        Address: '',
                        city:'',
                        country:''

                        
                }).then((user)=>{
                        sendToken(res, user, `Registered user ${user.username}`, 200);
                        console.log("USER REGISTERED SUCCESSFULLY")
                }).catch((error)=>{
                        console.log(error);
                        res.status(501).json({
                                error,
                                message:"User not registered"
                        })
                        
                })




                
                //  res.status(200).json({user:user, token: token})

        } catch (error) {
                console.log("ERROR", error);
                res.status(500).json({

                        message: "something went wrong"
                })


        }
}
const signin = async (req, res) => {

        try {
                const { email, password } = req.body;
                const existingUser = await User.findOne({ email: email }).select("password").maxTimeMS(15000);;

                if (!existingUser) {
                        return res.status(400).json({ messsage: "User not Registered, Signup now" })
                }
                const matchPassword = await existingUser.comparePassword(password)

                if (!matchPassword) {
                        res.status(400).json({message: "Password Incorrect"})
                } else {
                        sendToken(res, existingUser, "Signed in successfully", 201);
                }
 
        } catch (error) {
                console.log(error);
        } 
}
const signout = async (req, res, next) => {
        res
                .status(200)
                .cookie("token", null, {
                        expires: new Date(Date.now()),
                        //httpOnly: true,
                        // secure: true,
                        // sameSite: "none",
                })
                .json({
                        success: true,
                        message: "Logged Out Successfully",
                });

}
const updateProfile = catchAsyncError(async (req, res, next) => {
        const { name, email } = req.body;
      
        const user = await User.findById(req.user._id);
      
        if (name) user.name = name;
        if (email) user.email = email;
      
        await user.save();
      
        res.status(200).json({
          success: true,
          message: "Profile Updated Successfully",
        });
      });


const deleteMyProfile = catchAsyncError(async (req, res, next) => {
        const user = await User.findById(req.user._id);
      
        await cloudinary.v2.uploader.destroy(user.document.public_id);
        await cloudinary.v2.uploader.destroy(user.document.url);
      
        // Cancel Subscription
      
        await user.remove();
      
        res
          .status(200)
          .cookie("token", null, {
            expires: new Date(Date.now()),
          })
          .json({
            success: true,
            message: "User Deleted Successfully",
          });
      });
      
      
  const getMyProfile = catchAsyncError(async  (req, res, next) => {
        try {console.log("REQ>USER",req.user)
                const user = await User.findById(req.user);
      
        res.status(200).json({
          success: true,
          user,
        });
                
        } catch (error) {
                console.log(error)
                 res.send(error)
        }
        
});
 const forgetPassword = catchAsyncError(async (req, res, next) => {
        const { email } = req.body;
      
        const user = await User.findOne({ email });
      
        if (!user) return next(new ErrorHandlee("User not found", 400));
      
        const resetToken = await user.getResetToken();
      
        await user.save();
      
        const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
      
        const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;
      
        // Send token via email
        await sendEmail(user.email, "CourseBundler Reset Password", message);
      
        res.status(200).json({
          success: true,
          message: `Reset Token has been sent to ${user.email}`,
        });
      });


module.exports = { signup, signin, signout ,getMyProfile,updateProfile,deleteMyProfile,forgetPassword }