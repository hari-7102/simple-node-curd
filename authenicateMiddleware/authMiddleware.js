const jwt = require("jsonwebtoken")
const { accessTokenSecret } = require('../authUtlis.js/authUtlis');
const User = require("../models/userModels");


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
    // console.log("Auth", token)
  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, accessTokenSecret);
    console.log("decoded output" , decoded)
    // find user
    const user = await User.findById(decoded.id).select("-password");
    console.log("user info" , user)
    console.log("decode id " , decoded.email)
    if (!user) {
      return res.status(401).json({ message: "Invalid token - user not found" });
    }

    // attach user to request
    req.user = user;
    console.log("user ", user)
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired" });
    }
    return res.status(403).json({ message: "Invalid or malformed token" });
  }
};



module.exports = authMiddleware;