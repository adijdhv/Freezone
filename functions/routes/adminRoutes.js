 
const express = require("express")
const {isAuthenticated,authorizeAdmin,updateUserRole,deleteUser} = require('../middleware/auth')
const {getAllUsers} = require('../controllers/userController')
adminRoutes.route("/me").get(isAuthenticated, getMyProfile);

const adminRoutes = express.Router();
// Admin Routes
// router.route("/admin/Allusers").get(isAuthenticated, authorizeAdmin, getAllUsers);
adminRoutes.route("/admin/kyc").get(isAuthenticated, authorizeAdmin, getAllUsers);

// router
//   .route("/admin/user/:id")
//   .put(isAuthenticated, authorizeAdmin, updateUserRole)
//   .delete(isAuthenticated, authorizeAdmin, deleteUser);

module.exports= adminRoutes;
