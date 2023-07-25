const express = require("express")
const upload = express.Router();

const { uploadFile } = require("../controllers/uploadController")
const isAuthenticated = require('../middleware/auth')


//uploadRoutes.route("/upload").post(singleUpload); 
//uploadRoutes.put('/upload',uploadFile)


upload.route("/upload").put(isAuthenticated,uploadFile);






//upload.route("/fetchFile").get(downloadFile);
module.exports = upload;