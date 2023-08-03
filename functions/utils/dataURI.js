const DataUriParser = require( "datauri/parser.js");
const path = require("path");
//const express = require('express')
//const app = express();
const session = require('express-session');

const getDataUri = (file) => {
  const parser = new DataUriParser();
  console.log("file originalname",file.originalname)
  const extName = path.extname(file.originalname).toString();
  session.extName = extName;
  return parser.format(extName, file.buffer);
};
 
   

module.exports = {getDataUri}
