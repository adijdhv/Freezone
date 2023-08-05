 
const express = require("express")
const {isAuthenticated,authorizeAdmin} = require('../middleware/auth');
const { getAllUsers, signUpADMIN, signinADMIN, getRole ,logoutADMIN} = require("../controllers/adminController");
//const {getAllUsers} = require('../controllers/userController')

const adminRoutes = express.Router();
// Admin Routes
//adminRoutes.route("/me").get(isAuthenticated, getMyProfile);
// router.route("/admin/Allusers").get(isAuthenticated, authorizeAdmin, getAllUsers);
adminRoutes.route("/allUsers").get(isAuthenticated, authorizeAdmin, getAllUsers);
adminRoutes.post("/signup",signUpADMIN);
adminRoutes.post("/signin",signinADMIN); 
adminRoutes.get("/signout",logoutADMIN);
//adminRoutes.get("/getRole",getRole);

// router
//   .route("/admin/user/:id")
//   .put(isAuthenticated, authorizeAdmin, updateUserRole)
//   .delete(isAuthenticated, authorizeAdmin, deleteUser);

module.exports= adminRoutes;
