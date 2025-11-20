const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const isAdmin = (req, res, next) => {
    User.findById(req.user.id)
        .then(user => {
            if (user && user.role === 'admin') {
                next();
            } else {
                res.status(403).json({ message: 'Access denied' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Server error' }));
};

module.exports = { authMiddleware, isAdmin };