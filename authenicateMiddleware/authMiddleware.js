const jwt = require("jsonwebtoken")
const { accessTokenSecret } = require('../authUtlis.js/authUtlis');
const User = require("../models/userModels");


const authMiddleware = async(req, res, next) => {        
    const authHeader = req.headers['authorization'];
    // console.log("authheader", authHeader)
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }   

    const decoded = jwt.verify(token, accessTokenSecret);
    // console.log("decoded" , decoded)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    console.log(user) // ✅ attach userAttach user info to request
        next();

};



module.exports = authMiddleware;