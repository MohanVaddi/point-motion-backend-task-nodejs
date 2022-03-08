const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    //removing the Bearer part from the authorization header.
    const token = authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            result: false,
            error: 'Please provide a JWT token',
        });
    }
    try {
        const decoded = jwt.verify(token, process.env['JWT_SECRET']);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            result: false,
            error: 'JWT Verification Failed',
        });
    }
    return next();
};
