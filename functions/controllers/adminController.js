const { catchAsyncError } = require("../middleware/catchAsyncError");
const User = require('../models/user')
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/sendToken");

const signUpADMIN =  async(req,res,next)=>{
   
    const { email, username, password } = req.body;
    console.log("IN ADMIN", email, username, password )



    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
            return res.status(400).json({ messsage: "user already Exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
            email: email,
            password: hashedPassword,
            username: username, 
            role: "admin",
            Address: '',
            city:'',
            country:''     
        }).then((user)=>{
            sendToken(res, user, `Admin Registered ${user.username}`, 200);
            console.log("Admin REGISTERED SUCCESSFULLY")
        }).catch((error)=>{
            console.log(error);
            res.status(501).json({
                    error,
                    message:"Admin not registered"
                })
            
    }) }

const signinADMIN = async (req, res) => {

  try {
          const { email, password } = req.body;
          const existingUser = await User.findOne({ email: email }).select("password").maxTimeMS(15000);;

          if (!existingUser) {
                  return res.status(400).json({ messsage: "Admin not Registered " })
          }
          
          const matchPassword = await existingUser.comparePassword(password)

          if (!matchPassword) {
                  res.status(400).json({message: "Password Incorrect"})
          } else {
            console.log("SIGNEDIN Successful")
                  sendToken(res, existingUser, "Signed in successfully", 201);
          }

  } catch (error) {
          console.log(error);
  } 
}


const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});
  console.log("ALL USERS: ", users)

  res.status(200).json({
    success: true,
    users,
  });
});

const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  if (user.role === "user") user.role = "admin";
  else user.role = "user";

  await user.save();

  res.status(200).json({
    success: true,
    message: "Role Updated",
  });
});

const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel Subscription

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

const getRole = async(req,res,next)=>{
  try {
    
   const userrole = req.user.role
  console.log(userrole)
  res.status(201).json({
    'userRole':userrole
  })
   
  } catch (error) {
    console.log(error)
    
    res.status(500).json({
      error
    })
  }
  

}
 const logoutADMIN = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

const deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

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
module.exports = { deleteMyProfile, deleteUser, getAllUsers, updateUserRole,signUpADMIN ,logoutADMIN,getRole,signinADMIN}