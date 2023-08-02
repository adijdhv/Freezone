const jwt = require("jsonwebtoken");

const ErrorHandler = require("../utils/errorHandler.js");
const { catchAsyncError } = require("./catchAsyncError.js");
//const { User } = require("../models/user.js");
const User = require("../models/user.js");



 const isAuthenticated = catchAsyncError(async (req, res, next) => {
  //const userAgent = req.headers['authorization'];
  const authHeader = req.headers['authorization']
  console.log("authHeader",authHeader)
  const token = authHeader && authHeader.split(' ')[1];
   
  console.log("TOKEN::: ",token)
   
  if (!token) return next(new ErrorHandler("Not Logged In", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded: ", decoded._id)

  req.user = await User.findById({ _id: decoded._id });
  console.log("REQ.USER:", req.user)
 
  next();
  
}); 

const authorizeAdmin = (req, res, next) => {
  if (req.user.role == 'user')
    return next(
      new ErrorHandler(
        `${req.user.username}, user is not allowed to access this resource`,
        403
      )
    );

  next();
};
module.exports = { isAuthenticated, authorizeAdmin };