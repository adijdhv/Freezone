const express = require("express");

const app = express();

const cors = require('cors')
require("dotenv").config({path : "Backend/config/config.env"})

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.use((req,res,next) =>{
        console.log(`Method: ${req.method} and URL: ${req.url}`)
        next()
})



const userRouter = require("./routes/userRoutes")
app.get("/",(req,res)=>{
        res.send("Working Fine")
})
app.use("/api/",userRouter)


module.exports = app;