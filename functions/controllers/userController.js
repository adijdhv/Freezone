const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const SECRET_KEY = "APIDONE"
const { JsonWebTokenError } = require( "jsonwebtoken");
const userModel  = require(  "../models/user");
console.log("above signup")

const signup = async(req,res) =>{
        console.log("into signup")

        const{ email,username,password} = req.body;
        res.send("<h1>IN SIGN UP</h1>")

          
        try {
                const existingUser = await userModel.findOne({ email: email });
                if(existingUser){
                        return res.status(400).json({ messsage: "user already Exists"})
                }
                const hashedPassword = await bcrypt.hash(password,10);

                const result = await userModel.create({
                        email: email,
                        password : hashedPassword,
                        username: username
                })
                const token = jwt.sign({
                        _email_: result.email, id: result._id
                },SECRET_KEY)
                res.status(200).json({user:result, token: token})

        } catch (error) {
                console.log(error);
                res.status(500).json({
                        message: "something went wrong"
                })


        }
}
const signin = async(req,res)=>{
        const {email, password} = req.body;
        try {
                const existingUser = await userModel.findOne({ email: email });
                if(!existingUser){
                        return res.status(400).json({ messsage: "User not Registered, Signup now"})
                }
                const matchPassword = await bcrypt.compare(password,existingUser.password);
                if(!matchPassword){
                        res.status(400).json({
                                message:"Password Incorrect"
                        })
                }

              
                const token = jwt.sign({
                        _email_: existingUser.email, id: existingUser._id
                },SECRET_KEY)
                res.status(200).json({user:existingUser, token: token})

        } catch (error) {
                console.log(error);
                res.status(500).json({
                        message: "something went wrong"
                })

        }


}


module.exports = {signup,signin}