  const mongoose = require("mongoose")
  const bcrypt = require("bcrypt")
  const jwt = require("jsonwebtoken");
  const crypto = require( "crypto");

 const schema = mongoose.Schema({
        

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
                required: true,
                select: false,
        } ,
        firstName:{
          type:String
        },
        lastname:{
          type:String
        },
        Address :{
          type: String,
        },

        city:{
          type:String
        },
        
        country:{
          type:String
        },
        kycSubmitted :{
          type: Boolean
        },
        kycApproved :{
          type: Boolean, 
          default: false
        },
        
        document: {
          public_id: {
            type: String,
            
          },
          url: {
            type: String,
            
          },
        },
        role: {
          type: String,
          enum: ["admin", "user"],
          default: "user",
        },
        

 },{timestamps :true});

//  schema.pre("save", async function (next) {
//         if (!this.isModified("password")) return next();
//         this.password = await bcrypt.hash(this.password, 10);
//         next();
//       });

 schema.methods.comparePassword = async function (password) {
        //console.log("this PASSWORD",this.password)
        //console.log("Passed password",password)
        return await bcrypt.compare(password, this.password )
                
              

      };

 
      schema.methods.getJWTToken = function () {
       // console.log("SECRET KEY: ",process.env.SECRET_KEY  )
        return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
          expiresIn: "15d",
        });
      };
      // schema.methods.getResetToken = function () {
      //   const resetToken = crypto.randomBytes(20).toString("hex");
      
      //   this.resetPasswordToken = crypto
      //     .createHash("sha256")
      //     .update(resetToken)
      //     .digest("hex");
      
      //   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
      
      //   return resetToken;
      // };

 module.exports = mongoose.model("User",schema);