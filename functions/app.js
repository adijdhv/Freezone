const express = require("express");

const app = express();

require("dotenv").config({path : "Backend/config/config.env"})

app.use(express.json())
app.use(express.urlencoded({extended: false}));



const userRouter = require("./routes/userRoutes")

app.use("/api/",userRouter)


module.exports = app;