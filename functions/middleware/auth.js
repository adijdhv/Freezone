const jwt = require("jsonwebtoken");
const SECRET_KEY = "APIDONE";
const auth = (req,res,next) =>{
try {
        
        let token = req.headers.autherization;

        if(token){
                token = token.split("")[1];
                let user = jwt.verify(token, SECRET_KEY)

                req.userId =user.id;

        }else{
                res.status(401).json({
                        message: "Unautherized User"
                })
        }
        next()

} catch (error) {
        console.log(error)
        
}
}

module.exports = auth;