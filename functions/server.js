const app = require("./app");
const { connectDatabase } = require("./config/database");

connectDatabase()

PORT = "3000"
app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT} 
         link : http://localhost:3000/api/signup`)
})

//Endpoints for localhost
//signup -  http://localhost:3000/api/signup