const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
  const token = req.body.token;
  try {
    if (!token) return res.status(404).send("Token is required")
    req.user = jwt.verify(token, "alskdj2332oij23io23io23");
} catch (error) {
  //  return res.status(500).send("Token is expired")
   throw new Error(error)
  }
  return next()
};

module.exports = verifyToken
