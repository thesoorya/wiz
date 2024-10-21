const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const token = req.cookies.wizard;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};

exports.admin = async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    }
    else {
        res.status(401).json({ success: false, message: 'Access denied - Admin only' });
    }
}
