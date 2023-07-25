const express = require("express");
const userRouter = require("./routes/userRoutes")
const cookieParser = require("cookie-parser");
const cloudinaryUpload = require('./routes/uploadDocument')
const cors = require('cors')
require("dotenv").config({ path: "functions/config/.env" })
const session = require('express-session');


const app = express();

app.use(session({
        secret: process.env.session_secret, // Replace with your own secret key for session data encryption
        resave: false,
        saveUninitialized: false,
      }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())
 
app.use(cookieParser());

app.use((req, res, next) => {
        console.log(`Method: ${req.method} and URL: ${req.url}`)
        next()
})

 
app.use("/api/file/", cloudinaryUpload)
 
app.get("/", (req, res) => {
        res.send("Working Fine")
})
app.use("/api/user/", userRouter)



module.exports = app;