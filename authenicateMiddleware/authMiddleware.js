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



// middleware/roleMiddleware.js

const adminOnly = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'ADMIN') {
      next(); // allow access
    } else {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports = { 
  authMiddleware , adminOnly};