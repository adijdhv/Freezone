const express = require("express");

const app = express();

require("dotenv").config({path : "Backend/config/config.env"})

app.use(express.json())
app.use(express.urlencoded({extended: false}));


app.use((req,res,next) =>{
        console.log(`Method: ${req.method} and URL: ${req.url}`)
        next()
})



const userRouter = require("./routes/userRoutes")

app.use("/api/",userRouter)


module.exports = app;