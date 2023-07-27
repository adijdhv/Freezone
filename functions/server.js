const app = require("./app");
const { connectDatabase } = require("../functions/config/database");
const session = require('express-session');

const cloudinary = require("cloudinary") ;


connectDatabase()





cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
        api_key: process.env.CLOUDINARY_CLIENT_API,
        api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
      });
 

PORT = 80 || process.env.PORT
app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT} 
         link : http://localhost:3000/api/signup`)
})

//Endpoints for localhost
//signup -  http://localhost:3000/api/signup