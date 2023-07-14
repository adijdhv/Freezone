const { config } = require('dotenv');
const mongoose = require('mongoose')
PORT = process.env.PORT ||'3000'

MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.bqqk7uf.mongodb.net/'
 
console.log("Mongo URI",MONGO_URI)
exports.connectDatabase = () => {
        mongoose
                .connect(MONGO_URI)
                .then(
                        (con) => {
                                console.log(`DATABASE CONNECTED : ${con.connection.host}`)

                        }
                ).catch((err) => {
                        console.log(err)
                })
}  