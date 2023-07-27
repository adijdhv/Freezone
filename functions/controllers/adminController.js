const User = require("../models/user");


const kycApproved = async(req,res,next) =>{

        try { 
                const {username, email} = req.body;
        if(email ){

                const existingUser = await User.findOne({ email: email });        
        }else{
                const existingUser = await User.findOne({ username: username }); 
        }
                const docURL = existingUser.document.url 
                console.log("DOC URL: ",docURL)

                
        } catch (error) {
                console.log(error)
        }
       
}

module.exports = {kycApproved}