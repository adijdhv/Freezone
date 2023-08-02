// const mongoose = require("mongoose")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken");

// const schema = mongoose.Schema({
      

//       email : {
//               type: String,
//               required: true
//       },
//       username : {
//               type: String,
//               required: true
//       },
//       password : {
//               type: String,
//               required: true,
//               select: false,
//       } ,

//        KycDone:{
        
//         type:Number
       
//         },
      
      
//       role :{
//         type: String,
//         required: true,

//       }
      

// },{timestamps :true});

// //  schema.pre("save", async function (next) {
// //         if (!this.isModified("password")) return next();
// //         this.password = await bcrypt.hash(this.password, 10);
// //         next();
// //       });

// schema.methods.comparePassword = async function (password) {
//       //console.log("this PASSWORD",this.password)
//       //console.log("Passed password",password)
//       return await bcrypt.compare(password, this.password )
              
            

//     };


//     schema.methods.getJWTToken = function () {
//      // console.log("SECRET KEY: ",process.env.SECRET_KEY  )
//       return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: "15d",
//       });
//     };

// module.exports = mongoose.model("Admin",schema);