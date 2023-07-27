 
 const express = require("express")
 const userRoutes = express.Router();

 const {signup,signin, signout,getMyProfile} = require("../controllers/userController") 
 
 const {isAuthenticated}  = require('../middleware/auth')
 userRoutes.post("/signup",signup);
 userRoutes.post("/signin",signin);

 // Get my profile
 userRoutes.route("/me").get(isAuthenticated, getMyProfile);
 //userRoutes.get("/fetch",saveFileURLToDb);
 userRoutes.route("/signout").get(signout);

 
 module.exports = userRoutes;

