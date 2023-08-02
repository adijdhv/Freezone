const express = require("express");
const userRouter = require("./routes/userRoutes")
const adminRoutes = require('./routes/adminRoutes')
const cookieParser = require("cookie-parser");
//const upload = require('./routes/uploadDocument')
const cors = require('cors')
require("dotenv").config({ path: "functions/config/.env" })
const session = require('express-session');
const { getRole } = require("./controllers/adminController");
const { isAuthenticated } = require("./middleware/auth");
const { getMyProfile } = require("./controllers/userController");


const app = express();

// Add this middleware to enable CORS
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
      });

app.use(session({
        secret: process.env.session_secret, // Replace with your own secret key for session data encryption
        resave: false,
        saveUninitialized: false,
      }));

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(cors());

 
app.use(cookieParser());

app.use((req, res, next) => {
        console.log(`Method: ${req.method} and URL: ${req.url}`)
        next()
})

 
//app.use("/api/file/", upload)
 
app.get("/", (req, res) => {
        res.send("Working Fine")
})
app.get("/api/getRole", isAuthenticated, getRole )
app.use("/api/user/", userRouter)
//app.use("/api/admin/", adminRouter)
app.use("/api/admin/", adminRoutes)


module.exports = app;