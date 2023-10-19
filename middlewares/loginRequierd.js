const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');


module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
        const admin = await Admin.findOne({ where: { email: decodedToken.email } });
        const teacher = await Teacher.findOne({ where: { email: decodedToken.email } });
        if (!admin && !teacher) {
            throw new Error('You are not authorized to access this route');
        }
        if (admin) {
            req.admin = admin;
        }
        if (teacher) {
            req.teacher = teacher;
        }
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}
