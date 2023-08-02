 
 const express = require("express")
 const userRoutes = express.Router();

 const {signup,signin, signout,getMyProfile} = require("../controllers/userController") 
 
 const {isAuthenticated}  = require('../middleware/auth');
const { kycform } = require("../controllers/userKYCform");
const { uploadFile } = require("../controllers/uploadController");

 userRoutes.post("/signup",signup);
 userRoutes.post("/signin",signin);

 // Get my profile
 userRoutes.route("/me").get( getMyProfile);
 
 //userRoutes.get("/fetch",saveFileURLToDb);
//  /api/user/signout
 userRoutes.route("/signout").get(signout);

 //KYC 
 userRoutes.route("/kycform").put(isAuthenticated,kycform );
 userRoutes.route("/docUpload").put(isAuthenticated,uploadFile );

 
 module.exports = userRoutes;

