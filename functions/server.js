const app = require("./app");
const { connectDatabase } = require("./config/database");

connectDatabase()

PORT = process.env.PORT
app.listen("https://freezoneportal.netlify.app/")