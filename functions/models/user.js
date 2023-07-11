  const mongoose = require("mongoose")

 const userModel = mongoose.Schema({

        email : {
                type: String,
                required: true
        },
        username : {
                type: String,
                required: true
        },
        password : {
                type: String,
                required: true
        }

 },{timestamps :true});

 module.exports = mongoose.model("User",userModel);