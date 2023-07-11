const app = require("./app");
const { connectDatabase } = require("./config/database");

connectDatabase()


app.listen(process.env.PORT,()=>{
        console.log(`Server is running on ${process.env.PORT} 
         link : 
        
         http://localhost:3000/api/v1/signup`)
})