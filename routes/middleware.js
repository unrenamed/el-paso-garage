const jwt = require('jsonwebtoken');

const withAuth = (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
        sendNoTokenProvidedError(res);
    } else {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if (err) {
                sendInvalidTokenError(res);
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
};

const sendInvalidTokenError = (res) => {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
};

const sendNoTokenProvidedError = (res) => {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
};

module.exports = withAuth;
