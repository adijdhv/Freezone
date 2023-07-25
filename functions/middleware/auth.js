const jwt = require("jsonwebtoken");
 
const ErrorHandler= require("../utils/errorHandler.js"); 
const { catchAsyncError } = require("./catchAsyncError.js"); 
//const { User } = require("../models/user.js");
const User = require("../models/user.js");
//const SECRET_KEY = "APIDONE";
  const isAuthenticated = catchAsyncError(async (req, res, next) => {
        const { token } = req.cookies;
        console.log("User",User)
         
        if (!token) return next(new ErrorHandler("Not Logged In", 401));
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ",decoded._id )
      
        req.user = await User.findById(  {_id: decoded._id});
        console.log("REQ>USER:", req.user)
      
        next();
      });
module.exports = isAuthenticated;