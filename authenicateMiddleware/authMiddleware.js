const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../authUtlis.js/authUtlis');


const authMiddleware = (req, res, next) => {        
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }   

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }   
        req.user = user; // Attach user info to request
        next();
    });

}

module.exports = authMiddleware;