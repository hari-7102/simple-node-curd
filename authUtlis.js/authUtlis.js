const jwt = require('jsonwebtoken');


const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'scretKey-simpleBackendCrud';

const refreshAccessToken = process.env.REFRESH_TOKEN_SECRET || 'refreshKey-simpleBackendCrud';


const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, accessTokenSecret, { expiresIn: '5min' });
}

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, refreshAccessToken, { expiresIn: '7d' });
}   

module.exports = { 
    generateAccessToken,
    generateRefreshToken,
    accessTokenSecret,
    refreshAccessToken
};