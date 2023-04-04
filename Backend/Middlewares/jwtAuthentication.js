const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.headers["accessToken"];

  if (!token) {
    return res.send({message:"Not a authenticated user"});
  }
  try {
    const decoded = jwt.verify(token, "aarogya@123");
    req.data = decoded;
  } catch (err) {
    return res.send({message:"Token expired!!"});
  }
  return next();
};

module.exports={verifyToken};