 
 const express = require("express")

 const {signup,signin, signout,getMyProfile} = require("../controllers/userController") 
 
 const userRoutes = express.Router();
 const isAuthenticated  = require('../middleware/auth')
 userRoutes.post("/signup",signup);
 userRoutes.post("/signin",signin,isAuthenticated);

 // Get my profile
 userRoutes.route("/me").get(isAuthenticated, getMyProfile);
 //userRoutes.get("/fetch",saveFileURLToDb);
 userRoutes.route("/signout").get(signout);

 
 module.exports = userRoutes;

