const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');


module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ where: { id: decodedToken.id } });
        if (!admin) {
            throw new Error('You are not authorized to access this route');
        }
        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

