const cookieParser = require('cookie-parser');

function setUserNameCookie(req, res, username) {
  res.cookie('username', username, { maxAge: 3600000, httpOnly: true });
}

function getUserNameFromCookie(req) {
  return req.cookies.username;
}

module.exports = { setUserNameCookie, getUserNameFromCookie };